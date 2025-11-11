import { dialog } from "electron";
import { BaseService } from "./BaseService";
import { ipc } from "./ipc";

class DialogService extends BaseService {
    private static instance: DialogService | null = null;
    private constructor() {
        super();
    }

    private setupIpcEvents() {
        ipc.handle("dialog:error", (_, title, content) => dialog.showErrorBox(title, content));
        ipc.handle("dialog:message", (_, options) => dialog.showMessageBox(options));
        ipc.handle("dialog:openable", (_, options) => dialog.showOpenDialog(options));
        ipc.handle("dialog:saveable", (_, options) => dialog.showSaveDialog(options));
    }

    public static getInstance() {
        return this.instance || (this.instance = new DialogService());
    }

    public init() {
        super.init();
        this.setupIpcEvents();
    }
}
export const dialogService = DialogService.getInstance();
