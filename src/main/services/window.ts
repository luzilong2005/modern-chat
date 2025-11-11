import { baseWindowOptions, windowTemplateMap } from "../bases";
import { getWindowInitialSize } from "../utils";
import { logService } from "../services";
import { BrowserWindow, type BrowserWindowConstructorOptions } from "electron";
import { isDev } from "electron-util/main";
import path from "node:path";
import { BaseService } from "./BaseService";
import { ipc } from "./ipc";
import { WINDOW_NAME } from "@shared";
import { trayService } from "./tray";

class WindowService extends BaseService {
    private static instance: WindowService | null = null;
    private windowInstances = new Map<string, BrowserWindow>();

    private constructor() {
        super();
    }

    public static getInstance() {
        return this.instance ?? (this.instance = new WindowService());
    }

    private setupIpcEvents() {
        ipc.handle("window:maximize", (ev) => BrowserWindow.fromWebContents(ev.sender)?.maximize());
        ipc.handle("window:minimize", (ev) => BrowserWindow.fromWebContents(ev.sender)?.minimize());
        ipc.handle("window:unmaximize", (ev) => BrowserWindow.fromWebContents(ev.sender)?.unmaximize());
        ipc.handle("window:is-maximized", (ev) => BrowserWindow.fromWebContents(ev.sender)!.isMaximized());
        ipc.handle("window:is-minimized", (ev) => BrowserWindow.fromWebContents(ev.sender)!.isMinimized());
        ipc.handle("window:is-maximizable", (ev) => BrowserWindow.fromWebContents(ev.sender)!.isMaximizable());
        ipc.handle("window:is-minimizable", (ev) => BrowserWindow.fromWebContents(ev.sender)!.isMinimizable());
        ipc.handle("window:close", (ev) => {
            const win = BrowserWindow.fromWebContents(ev.sender);
            if (trayService.getTray()) {
                if (win === this.getMainWindow()) {
                    win?.hide();
                }
            }
            win?.close();
        });
        ipc.handle('window:open',(_, name, route)=>{
            this.create(name, windowTemplateMap[name].options, route);
        })
    }

    public init() {
        super.init();
        this.setupIpcEvents();
    }

    public create(name: string, options: BrowserWindowConstructorOptions, route?: string) {
        if (this.windowInstances.has(name)) return null;
        const win = new BrowserWindow({ ...baseWindowOptions, ...options });
        this.setRoute(win, route ?? "/");
        this.windowInstances.set(name, win);
        win.on("closed", () => this.windowInstances.delete(name));
        if (isDev) win.webContents.openDevTools({ mode: "undocked" });
        logService.info(`Window ${name} created`);
        return win;
    }

    public setRoute(win: BrowserWindow, route: string) {
        const url = isDev
            ? new URL(route, process.env.ELECTRON_RENDERER_URL!).toString()
            : `file:///${path.join(__dirname, "../renderer/index.html", route)}`;
        win.loadURL(url);
    }

    public createMainWindow() {
        if (this.windowInstances.has(WINDOW_NAME.MAIN)) return;
        this.create(WINDOW_NAME.MAIN, {
            ...windowTemplateMap[WINDOW_NAME.MAIN].options,
            ...getWindowInitialSize(),
        });
    }

    public openMainWindow() {
        const win = this.getMainWindow();
        if (win) {
            win.show();
            win.focus();
        }
    }

    public getMainWindow() {
        return this.windowInstances.get(WINDOW_NAME.MAIN) ?? null;
    }
}

export const windowService = WindowService.getInstance();
