import { BaseService } from "./BaseService";
import { ipc } from "./ipc";
import fs from "node:fs";
class FileService extends BaseService {
    private static instance: FileService | null = null;
    private constructor() {
        super();
    }

    private setupIpcEvents() {
        ipc.handle("file:read-file", async (_, path) => (await fs.promises.readFile(path)).toString());
        ipc.handle("file:write-file", async (_, path, content) => await fs.promises.writeFile(path, content));
    }

    public static getInstance() {
        return this.instance ?? (this.instance = new FileService());
    }

    public init() {
        super.init();
        this.setupIpcEvents();
    }
}

export const fileService = FileService.getInstance();
