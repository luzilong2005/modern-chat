import { clipboard } from "electron";
import { BaseService } from "./BaseService";
import { ipc } from "../ipc";
import { LOG_INFO } from "./log";

class ClipboardService extends BaseService {
    public constructor() {
        super();
    }

    protected setupIpcEvents() {
        ipc.handle("clipboard:write", (_, ...args) => clipboard.write(...args));
        ipc.handle("clipboard:write-text", (_, text, type) => clipboard.writeText(text, type));
    }

    public init() {
        super.init();
        LOG_INFO("[ClipboardService] initialized");
    }
}

export const clipboardService = ClipboardService.getInstance();
