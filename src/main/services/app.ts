import { logService } from "./log";
import { app, shell } from "electron";
import { BaseService } from "./BaseService";
import { ipc } from "./ipc";

class AppService extends BaseService {
    private static instance: AppService | null = null;
    private constructor() {
        super();
    }

    private setupIpcEvents() {
        console.log("setupIpcEvents")
        ipc.handle("app:quit", () => this.quit());
        ipc.handle("app:relaunch", () => this.relaunch());
        ipc.handle("app:open-path", (_, path) => this.openPath(path));
        ipc.handle("app:open-external", (_, url) => this.openExternal(url));
    }

    public static getInstance() {
        return this.instance || (this.instance = new AppService());
    }

    public init() {
        super.init();
        this.setupIpcEvents();
    }

    public quit() {
        logService.info("App quit");
        app.quit();
    }

    public relaunch() {
        logService.info("App relaunch");
        app.relaunch();
    }

    public openPath(path: string) {
        logService.info(`App open path: ${path}`);
        return shell.openPath(path);
    }

    public openExternal(url: string) {
        logService.info(`App open external: ${url}`);
        return shell.openExternal(url);
    }
}

export const appService = AppService.getInstance();
