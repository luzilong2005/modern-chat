import { WINDOW_NAME } from "@shared";
import { type BrowserWindowConstructorOptions } from "electron";
import path from "node:path";

export const baseWindowOptions: BrowserWindowConstructorOptions = {
    titleBarStyle: "hidden",
    title: "Modern Chat",
    center: true,
    webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: false,
        preload: path.join(__dirname, "../preload/preload.mjs"),
    },
};

export const windowTemplateMap: Record<WINDOW_NAME, { options: BrowserWindowConstructorOptions }> = {
    [WINDOW_NAME.MAIN]: { options: {} },
    [WINDOW_NAME.SETTINGS]: { options: { width: 600, height: 800 } },
    [WINDOW_NAME.ABOUT]: { options: { resizable: false, maximizable: false, width: 320, height: 400 } },
};
