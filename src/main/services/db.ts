import { app } from "electron";
import { BaseService } from "./BaseService";
import path from "node:path";
import BetterSqlite3 from "better-sqlite3";
import fs from "node:fs";
import { ipc } from "./ipc";
import type { ConversationData, MessageData } from "@shared";
const CONVERSATION_DB_TEMPLATE = `
CREATE TABLE IF NOT EXISTS conversation (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

const MESSAGE_DB_TEMPLATE = `
CREATE TABLE IF NOT EXISTS message (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id  INTEGER NOT NULL,
    role             TEXT NOT NULL,
    content          TEXT NOT NULL,
    created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversation(id) ON DELETE CASCADE
);
`;

class DatabaseService extends BaseService {
    private readonly DATA_DB_FILENAME = "data.db";
    private static instance: DatabaseService | null = null;
    private database: BetterSqlite3.Database | null = null;
    private constructor() {
        super();
    }

    private ensureDatabaseDir() {
        const databaseDir = this.getDatabaseDir();
        if (!fs.existsSync(databaseDir)) {
            fs.mkdirSync(databaseDir);
        }
    }

    private setupIpcEvents() {
        ipc.handle("db:get-conversations", () => {
            return this.database!.prepare("SELECT * FROM conversation").all() as ConversationData[];
        });
        ipc.handle("db:add-conversation", (_, title) => {
            const id = this.database!.prepare("INSERT INTO conversation (title) VALUES (?)").run(title).lastInsertRowid;
            const {
                id: _id,
                title: _title,
                created_at,
                updated_at,
            } = this.database!.prepare("SELECT * FROM conversation WHERE id = ?").get(id) as {
                id: number;
                created_at: string;
                updated_at: string;
                title: string;
            };
            return {
                id: Number(id),
                title,
                createdDate: new Date(created_at),
                updatedDate: new Date(updated_at),
            };
        });
        ipc.handle("db-delete-conversation", (_, id) => {
            this.database!.prepare("DELETE FROM conversation WHERE id = ?").run(id);
        });
        ipc.handle("db:get-messages", (_, conversationId) => {
            return this.database!.prepare("SELECT * FROM message WHERE conversation_id = ?").all(
                conversationId,
            ) as MessageData[];
        });
    }

    private setupDatabases() {
        this.ensureDatabaseDir();

        const dbPathName = path.join(this.getDatabaseDir(), this.DATA_DB_FILENAME);

        if (fs.existsSync(dbPathName)) {
            this.database = new BetterSqlite3(dbPathName);
            this.database.pragma("journal_mode = WAL");
            return;
        }

        const db = new BetterSqlite3(dbPathName);
        db.pragma("journal_mode = WAL");
        db.exec(CONVERSATION_DB_TEMPLATE);
        db.exec(MESSAGE_DB_TEMPLATE);
        this.database = db;
    }

    public static getInstance() {
        return (this.instance = this.instance ?? new DatabaseService());
    }

    public getDatabaseDir() {
        return path.join(app.getPath("userData"), "databases");
    }

    public init() {
        super.init();
        this.setupDatabases();
        this.setupIpcEvents();
    }
}

export const databaseService = DatabaseService.getInstance();
