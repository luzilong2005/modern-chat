import { Menu, MenuItem, Tray, webContents } from "electron";
import path from "node:path";
import { BaseService } from "./BaseService";
import { ipc } from "./ipc";
import { TRAY_CONTEXTMENU_CODE } from "@shared";
class TrayService extends BaseService {
    private static instance: TrayService | null = null;
    private tray: Tray | null = null;
    private constructor() {
        super();
    }

    private setupIpcEvents() {
        ipc.handle("tray:open", (_, templates) => {
            this.createTray(templates);
        });
        ipc.handle("tray:close", () => {
            this.destroyTray();
        });
    }

    private createTray(template: Array<{ code: TRAY_CONTEXTMENU_CODE; label: string }>) {
        if (this.tray) return;
        this.tray = new Tray(path.join(__dirname, "../../resources/icon.png"));
        this.tray.setContextMenu(
            Menu.buildFromTemplate(
                template.map(
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

    public static getInstance() {
        return (this.instance = this.instance || new TrayService());
    }

    public init() {
        super.init();
        this.setupIpcEvents();
    }

    public getTray() {
        return this.tray;
    }
}

export const trayService = TrayService.getInstance();
