import { BrowserWindow, dialog } from "electron";
import { BaseService } from "./BaseService";
import { ipc } from "./ipc";
import { windowService } from "./window";
import { pick } from "es-toolkit";
import { logService } from "./log";
class DialogService extends BaseService {
    private static instance: DialogService | null = null;
    private constructor() {
        super();
    }

    private setupIpcEvents() {
        ipc.handle("dialog:error", (_, title, content) => dialog.showErrorBox(title, content));
        ipc.handle("dialog:message", (_, options) => dialog.showMessageBox(BrowserWindow.getFocusedWindow()!, options));
        ipc.handle("dialog:openable", (_, options) =>
            dialog.showOpenDialog(BrowserWindow.getFocusedWindow()!, options),
        );
        ipc.handle("dialog:saveable", (_, options) =>
            dialog.showSaveDialog(BrowserWindow.getFocusedWindow()!, options),
        );
        ipc.handle("dialog:create", (_, options) => {
            const currentWindow = BrowserWindow.getFocusedWindow();
            if (!currentWindow) {
                logService.error(`无法打开{${options.name}}窗口`);
                return;
            }
            this.create({ ...options, parentWindow: currentWindow });
        });
    }

    public static getInstance() {
        return this.instance || (this.instance = new DialogService());
    }

    public init() {
        super.init();
        this.setupIpcEvents();
    }

    public create(options: {
        name: string;
        route: string;
        parentWindow: BrowserWindow;
        width?: number;
        height?: number;
    }) {
        windowService.create(
            options.name,
            {
                ...pick(options, ["width", "height"]),
                parent: options.parentWindow,
                modal: true,
            },
            options.route,
        );
    }
}
export const dialogService = DialogService.getInstance();
