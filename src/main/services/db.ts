import { app } from "electron";
import { BaseService } from "./BaseService";
import path from "node:path";
import BetterSqlite3 from "better-sqlite3";
import fs from "node:fs";
const CONVERSATION_DB_TEMPLATE = `
CREATE TABLE IF NOT EXISTS conversation (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

const MESSAGE_DB_TEMPLATE = `
CREATE TABLE IF NOT EXISTS message (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id  INTEGER NOT NULL,
    sender           TEXT CHECK(sender IN ('user', 'bot')) NOT NULL,
    content          TEXT NOT NULL,
    created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversation(id) ON DELETE CASCADE
);
`;

class DatabaseService extends BaseService {
    private readonly CONVERSATION_DB_FILENAME = "conversation.db";
    private readonly MESSAGE_DB_FILENAME = "message.db";
    private static instance: DatabaseService | null = null;
    private databases = new Map<string, BetterSqlite3.Database>();
    private constructor() {
        super();
    }

    private ensureDatabaseDir() {
        const databaseDir = this.getDatabaseDir();
        if (!fs.existsSync(databaseDir)) {
            fs.mkdirSync(databaseDir);
        }
    }

    private setupIpcEvents() {}

    private setupDatabases() {
        this.ensureDatabaseDir();
        {
            const conversationDatabase = new BetterSqlite3(
                path.join(this.getDatabaseDir(), this.CONVERSATION_DB_FILENAME),
            );
            conversationDatabase.pragma("journal_mode = WAL");
            conversationDatabase.exec(CONVERSATION_DB_TEMPLATE);
            this.databases.set(this.CONVERSATION_DB_FILENAME, conversationDatabase);
        }
        {
            const messageDatabase = new BetterSqlite3(path.join(this.getDatabaseDir(), this.MESSAGE_DB_FILENAME));
            messageDatabase.pragma("journal_mode = WAL");
            messageDatabase.exec(MESSAGE_DB_TEMPLATE);
            this.databases.set(this.MESSAGE_DB_FILENAME, messageDatabase);
        }
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
