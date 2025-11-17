import { app } from "electron";
import { BaseService } from "./BaseService";
import path from "node:path";
import BetterSqlite3 from "better-sqlite3";
import fs from "node:fs";
import { LOG_INFO } from "./log";
import type { ConversationData, MessageData } from "@shared";
import { ipc } from "../ipc";

const CONVERSATION_DB_TEMPLATE: string = `
CREATE TABLE IF NOT EXISTS conversation (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

const MESSAGE_DB_TEMPLATE: string = `
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
    private database: BetterSqlite3.Database | null = null;

    protected setupIpcEvents() {
        ipc.handle("db:get-messages", (_, id) => this.getMessages(id));
        ipc.handle("db:add-conversation", (_, data) => this.insertConversation(data));
        ipc.handle("db:get-conversations", () => {
            return (this.database?.prepare("SELECT * FROM conversation").all() ?? []) as ConversationData[];
        });
        ipc.handle("db:delete-conversation", (_, id) => {
            this.database?.prepare("DELETE FROM conversation WHERE id = ?").run(id);
        });
        ipc.handle("db:add-message", (_, id, role, content) => {
            return this.insertMessage({ conversationId: id, role, content });
        });
    }

    private ensureDatabaseDir() {
        const dir = this.getDatabaseDir();
        if (!fs.existsSync(dir)) {
            LOG_INFO(`[DatabaseService] Creating database directory: ${dir}`);
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    private connect() {
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

    public constructor() {
        super();
    }

    public init() {
        super.init();
        LOG_INFO("[DatabaseService] Initialized");

        LOG_INFO(`[DatabaseService] Connect database`);
        this.connect();
    }

    public getDatabaseDir() {
        return path.join(app.getPath("userData"), "databases");
    }

    public insertConversation(data: { title: string }) {
        const result = this.database!.prepare("INSERT INTO conversation (title) VALUES (?)").run(data.title);
        return this.database!.prepare("SELECT * FROM conversation WHERE id = ?").get(
            result.lastInsertRowid,
        ) as ConversationData;
    }

    public insertMessage(data: { conversationId: bigint; role: string; content: string }) {
        const result = this.database!.prepare("INSERT INTO message (conversation_id, role, content) VALUES (?, ?, ?)").run(
            data.conversationId,
            data.role,
            data.content,
        );

        return this.database!.prepare("SELECT * FROM message WHERE id = ?").get(result.lastInsertRowid) as MessageData;
    }

    public getMessages(conversationId: bigint) {
        return (this.database?.prepare("SELECT * FROM message WHERE conversation_id = ?").all(conversationId) ??
            []) as MessageData[];
    }
}

export const databaseService = new DatabaseService();
