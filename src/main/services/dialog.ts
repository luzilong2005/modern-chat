import { BrowserWindow, dialog, webContents } from "electron";
import { BaseService } from "./BaseService";
import { ipc } from "./ipc";
import { windowService } from "./window";
import { pick } from "es-toolkit";
import { LOG_ERROR } from "./log";
class DialogService extends BaseService {
    private static instance: DialogService | null = null;
    private dialogs = new Map<string, BrowserWindow>();
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
                LOG_ERROR(`无法打开{${options.name}}窗口`);
                return;
            }
            this.create({ ...options, parentWindow: currentWindow });
        });
        ipc.handle("dialog:close", (_, { name, data }) => {
            const win = this.dialogs.get(name);
            if (!win) return;
            webContents.getAllWebContents().forEach((wc) => {
                ipc.send(wc, "dialog:closed", name, data);
            });
            win.close();
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
        const win = windowService.create(
            options.name,
            {
                ...pick(options, ["width", "height"]),
                parent: options.parentWindow,
                modal: true,
            },
            options.route,
        );
        if (!win) return;
        this.dialogs.set(options.name, win);
    }
}
export const dialogService = DialogService.getInstance();
