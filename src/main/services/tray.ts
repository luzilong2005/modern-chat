import { Menu, MenuItem, Tray, webContents } from "electron";
import path from "node:path";
import { BaseService } from "./BaseService";
import { ipc } from "../ipc";
import { TRAY_CONTEXTMENU_CODE } from "@shared";
import { LOG_INFO } from "./log";
class TrayService extends BaseService {
    private tray: Tray | null = null;
    public constructor() {
        super();
    }

    protected setupIpcEvents() {
        ipc.handle("tray:open", (_, templates) => {
            this.createTray(templates);
        });
        ipc.handle("tray:close", () => {
            this.destroyTray();
        });
    }

    private createTray(templates: Array<{ code: TRAY_CONTEXTMENU_CODE; label: string }>) {
        if (this.tray) return;
        this.tray = new Tray(path.join(__dirname, "../../resources/icon.png"));
        this.tray.setContextMenu(
            Menu.buildFromTemplate(
                templates.map(
                    ({ code, label }) =>
                        new MenuItem({
                            label,
                            click: () => {
                                webContents.getAllWebContents().forEach((wc) => {
                                    ipc.send(wc, "tray:clicked", code);
                                });
                            },
                        }),
                ),
            ),
        );
    }

    private destroyTray() {
        if (!this.tray) return;
        this.tray.destroy();
        this.tray = null;
    }

    public init() {
        super.init();
        LOG_INFO("[TrayService] Initialized");
    }

    public getTray() {
        return this.tray;
    }
}

export const trayService = TrayService.getInstance();
