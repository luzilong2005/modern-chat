import { BaseService } from "./BaseService";
import { BrowserWindow } from "electron";
import { isDev } from "electron-util/main";
import { WINDOW_NAME } from "@shared";
import { type BrowserWindowConstructorOptions } from "electron";
import path from "node:path";
import { ipc } from "../ipc";
import { getWindowInitialSize } from "../utils";
import { LOG_ERROR } from "./log";
import { trayService } from "./tray";

const baseWindowOptions: BrowserWindowConstructorOptions = {
    titleBarStyle: "hidden",
    title: "Modern Chat",
    center: true,
    webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: false,
        preload: path.join(__dirname, "../preload/preload.cjs"),
    },
};

const windowTemplateMap: Record<WINDOW_NAME, { options: BrowserWindowConstructorOptions }> = {
    [WINDOW_NAME.MAIN]: { options: {} },
    [WINDOW_NAME.SETTINGS]: { options: { width: 800, height: 600 } },
    [WINDOW_NAME.ABOUT]: { options: { resizable: false, maximizable: false, width: 320, height: 400 } },
};

class WindowService extends BaseService {
    private windows = new Map<string, BrowserWindow>();

    constructor() {
        super();
    }

    protected setupIpcEvents() {
        ipc.handle("window:set-closable", (ev, enabled) => BrowserWindow.fromWebContents(ev.sender)?.setClosable(enabled));
        ipc.handle("window:set-maximizable", (ev, enabled) =>
            BrowserWindow.fromWebContents(ev.sender)?.setMaximizable(enabled),
        );
        ipc.handle("window:set-minimizable", (ev, enabled) =>
            BrowserWindow.fromWebContents(ev.sender)?.setMinimizable(enabled),
        );
        ipc.handle("window:maximize", (ev) => BrowserWindow.fromWebContents(ev.sender)?.maximize());
        ipc.handle("window:minimize", (ev) => BrowserWindow.fromWebContents(ev.sender)?.minimize());
        ipc.handle("window:unmaximize", (ev) => BrowserWindow.fromWebContents(ev.sender)?.unmaximize());
        ipc.handle("window:is-maximized", (ev) => BrowserWindow.fromWebContents(ev.sender)!.isMaximized());
        ipc.handle("window:is-minimized", (ev) => BrowserWindow.fromWebContents(ev.sender)!.isMinimized());
        ipc.handle("window:is-maximizable", (ev) => BrowserWindow.fromWebContents(ev.sender)!.isMaximizable());
        ipc.handle("window:is-minimizable", (ev) => BrowserWindow.fromWebContents(ev.sender)!.isMinimizable());
        ipc.handle("window:close", (ev) => {
            const win = BrowserWindow.fromWebContents(ev.sender);
            if (win === this.getMainWindow() && trayService.getTray()) {
                win?.hide();
            } else {
                for (const [name, target] of this.windows) {
                    if (target === this.getMainWindow()) continue;
                    if (target === win) this.close(name);
                }
            }
        });
        ipc.handle("window:open", (_, name, route, options) => {
            if (name === WINDOW_NAME.MAIN) {
                this.getMainWindow().show();
                return;
            }
            this.create(name, { ...windowTemplateMap[name].options, ...options }, route);
        });
    }

    private createMainWindow() {
        this.create(WINDOW_NAME.MAIN, { ...windowTemplateMap[WINDOW_NAME.MAIN].options, ...getWindowInitialSize() }, "/");
    }

    public init() {
        super.init();
        this.createMainWindow();
    }

    public setRoute(win: BrowserWindow, route: string) {
        const url = isDev
            ? new URL(route, process.env.ELECTRON_RENDERER_URL!).toString()
            : `file:///${path.join(__dirname, "../renderer/index.html", route)}`;
        win.loadURL(url);
    }

    public create(name: string, options: BrowserWindowConstructorOptions, route: string) {
        if (this.windows.has(name)) {
            LOG_ERROR(`[WindowService] Window [${name}] already exists`);
            return null;
        }
        const window = new BrowserWindow({ ...baseWindowOptions, ...options });
        this.setRoute(window, route);
        this.windows.set(name, window);
        if (isDev) window.webContents.openDevTools({ mode: "detach" });
        return window;
    }

    public close(name: string) {
        const window = this.windows.get(name);
        if (!window) {
            LOG_ERROR(`[WindowService] Window [${name}] does not exist`);
            return;
        }
        window.close();
        this.windows.delete(name);
    }

    public getMainWindow() {
        return this.windows.get(WINDOW_NAME.MAIN)!;
    }

    public getWindow(name: string) {
        return this.windows.get(name) ?? null;
    }
}
export const windowService = new WindowService();
