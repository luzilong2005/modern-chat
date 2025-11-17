import { BaseService } from "./BaseService";
import { ipc } from "../ipc";
import fs from "node:fs";
import { LOG_INFO } from "./log";
class FileService extends BaseService {
    public constructor() {
        super();
    }

    protected setupIpcEvents() {
        ipc.handle("file:read-file", async (_, path) => (await fs.promises.readFile(path)).toString());
        ipc.handle("file:write-file", async (_, path, content) => await fs.promises.writeFile(path, content));
    }

    public init() {
        super.init();
        LOG_INFO("[FileService] Initialized");
    }
}

export const fileService = FileService.getInstance();
