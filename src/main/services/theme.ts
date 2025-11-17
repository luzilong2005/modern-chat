import { nativeTheme } from "electron";
import { ipc } from "../ipc";
import { BaseService } from "./BaseService";
import { THEME_MODE } from "@shared";
import { LOG_INFO } from "./log";

class ThemeService extends BaseService {
    private themeMode: THEME_MODE = THEME_MODE.SYSTEM;
    public constructor() {
        super();
    }

    protected setupIpcEvents() {
        ipc.handle("theme:get-mode", () => this.themeMode);
        ipc.handle("theme:set-mode", (_, mode) => {
            this.themeMode = mode;
            nativeTheme.themeSource = this.themeMode;
        });
    }

    public init() {
        super.init();
        LOG_INFO("[ThemeService] Initialized");
    }
}

export const themeService = new ThemeService();
