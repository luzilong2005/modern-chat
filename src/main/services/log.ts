import logger from "electron-log";
import { BaseService } from "./BaseService";
import fs from "node:fs";
import { isDev } from "electron-util/main";
import path from "node:path";
import dayjs from "dayjs";
import { app } from "electron";
import { ipc } from "../ipc";
class LogService extends BaseService {
    private readonly LOG_RETENTION_DAYS = 7;
    private readonly CLEANUP_INTERVAL_MS = 1000 * 60 * 60 * 24;

    public constructor() {
        super();
        this.setupLogger();
    }

    protected setupIpcEvents() {
        ipc.handle("log:debug", () => this.debug());
        ipc.handle("log:info", () => this.info());
        ipc.handle("log:warn", () => this.warn());
        ipc.handle("log:error", () => this.error());
        ipc.handle("log:get-dir", () => this.getLogDir());
        ipc.handle("log:cleanup", () => {
            this.cleanupAllLogs();
        });
    }

    private setupLogger() {
        const logDir = this.getLogDir();
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        logger.transports.file.resolvePathFn = () => path.resolve(logDir, `${dayjs().format("YYYY-MM-DD")}.log`);
        logger.transports.file.format = "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}";
        logger.transports.file.maxSize = 1024 * 1024 * 10;
        logger.transports.file.level = "debug";
        logger.transports.console.level = isDev ? "debug" : "info";

        this.cleanupOldLogs();
        setInterval(() => this.cleanupOldLogs(), this.CLEANUP_INTERVAL_MS);
    }

    public init() {
        super.init();

        LOG_INFO("[LogService] Initializing");
    }

    /**
     * Windows: C:\Users\{username}\AppData\Roaming\modern-chat\logs
     */
    public getLogDir() {
        return path.join(app.getPath("userData"), "logs");
    }

    public async cleanupOldLogs() {
        const logDir = this.getLogDir();
        if (!fs.existsSync(logDir)) return;

        const expirationDate = dayjs().subtract(this.LOG_RETENTION_DAYS, "day").toDate();
        const files = await fs.promises.readdir(logDir);
        let deletedCount = 0;

        for (const file of files) {
            if (!file.endsWith(".log")) continue;
            const filePath = path.join(logDir, file);
            const stat = await fs.promises.stat(filePath);
            if (stat.isFile() && stat.birthtime < expirationDate) {
                await fs.promises.unlink(filePath);
                deletedCount += 1;
            }
        }

        if (deletedCount > 0) {
            this.info(`Successfully deleted ${deletedCount} old log files`);
        }
    }

    public async cleanupAllLogs() {
        const logDir = this.getLogDir();
        const errorFiles: string[] = [];
        let deletedCount = 0;

        if (!fs.existsSync(logDir)) {
            this.info("Log directory does not exist, nothing to clean");
            return { deletedCount, errorFiles };
        }

        const files = await fs.promises.readdir(logDir);

        await Promise.all(
            files
                .filter((f) => f.endsWith(".log"))
                .map(async (f) => {
                    const filePath = path.join(logDir, f);
                    await fs.promises.unlink(filePath);
                    deletedCount += 1;
                    this.error(`Failed to delete log file: ${filePath}`);
                    errorFiles.push(filePath);
                }),
        );
        this.info(`Cleared all log files, deleted: ${deletedCount}`);
        return { deletedCount, errorFiles };
    }

    public info(...messages: any[]) {
        logger.info(...messages);
    }

    public error(...messages: any[]) {
        logger.error(...messages);
    }

    public warn(...messages: any[]) {
        logger.warn(...messages);
    }

    public debug(...messages: any[]) {
        logger.debug(...messages);
    }
}

export const logService = LogService.getInstance();

export const LOG_INFO = (...messages: any[]) => logService.info(...messages);
export const LOG_ERROR = (...messages: any[]) => logService.error(...messages);
export const LOG_WARN = (...messages: any[]) => logService.warn(...messages);
export const LOG_DEBUG = (...messages: any[]) => logService.debug(...messages);
