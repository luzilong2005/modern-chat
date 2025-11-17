import { LOG_INFO, logService } from "./log";
import { app, shell } from "electron";
import { BaseService } from "./BaseService";
import { ipc } from "../ipc";

class AppService extends BaseService {
    public constructor() {
        super();
    }

    protected setupIpcEvents() {
        ipc.handle("app:quit", () => this.quit());
        ipc.handle("app:relaunch", () => this.relaunch());
        ipc.handle("app:open-path", (_, path) => this.openPath(path));
        ipc.handle("app:open-external", (_, url) => this.openExternal(url));
    }

    public init() {
        super.init();
        LOG_INFO("[AppService] Initialized");
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
