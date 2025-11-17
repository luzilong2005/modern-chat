import { BrowserWindow, dialog, webContents } from "electron";
import { BaseService } from "./BaseService";
import { ipc } from "../ipc";
import { windowService } from "./window";
import { omit } from "es-toolkit";
import { LOG_ERROR, LOG_INFO } from "./log";
class DialogService extends BaseService {
    public constructor() {
        super();
    }

    protected setupIpcEvents() {
        ipc.handle("dialog:error", (_, title, content) => dialog.showErrorBox(title, content));
        ipc.handle("dialog:message", (_, options) => dialog.showMessageBox(BrowserWindow.getFocusedWindow()!, options));
        ipc.handle("dialog:openable", (_, options) => dialog.showOpenDialog(BrowserWindow.getFocusedWindow()!, options));
        ipc.handle("dialog:saveable", (_, options) => dialog.showSaveDialog(BrowserWindow.getFocusedWindow()!, options));
        ipc.handle("dialog:create", (_, options) => {
            const currentWindow = BrowserWindow.getFocusedWindow();
            if (!currentWindow) {
                LOG_ERROR(`无法打开{${options.name}}窗口`);
                return;
            }
            windowService.create(
                options.name,
                {
                    ...omit(options, ["name", "route"]),
                    parent: currentWindow,
                    modal: true,
                },
                options.route,
            );
        });
        ipc.handle("dialog:close", (_, name, data) => {
            const win = windowService.getWindow(name);
            if (!win) return;
            webContents.getAllWebContents().forEach((wc) => {
                ipc.send(wc, "dialog:closed", name, data);
            });
            windowService.close(name);
        });
    }

    public init() {
        super.init();
        LOG_INFO("[DialogService] Initialized");
    }
}
export const dialogService = DialogService.getInstance();
