import { clipboard } from "electron";
import { BaseService } from "./BaseService";
import { ipc } from "./ipc";

class ClipboardService extends BaseService {
    private static instance: ClipboardService | null = null;

    private constructor() {
        super();
    }

    private setupIpcEvents() {
        ipc.handle("clipboard:write", (_, ...args) => clipboard.write(...args));
        ipc.handle("clipboard:write-text",(_, text) => clipboard.writeText(text));
    }

    public static getInstance() {
        return this.instance ?? (this.instance = new ClipboardService());
    }

    public init() {
        super.init();
        this.setupIpcEvents();
    }
}

export const clipboardService = ClipboardService.getInstance();
