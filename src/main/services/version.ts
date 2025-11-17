import { BaseService } from "./BaseService";
import { ipc } from "../ipc";
import { LOG_INFO } from "./log";

class VersionService extends BaseService {
    protected setupIpcEvents() {
        ipc.handle("version:node", () => this.getNode());
        ipc.handle("version:electron", () => this.getElectron());
        ipc.handle("version:chromium", () => this.getChromium());
        ipc.handle("version:platform", () => this.getPlatform());
        ipc.handle("version:arch", () => this.getArch());
    }

    public constructor() {
        super();
    }

    public init() {
        super.init();
        LOG_INFO("[VersionService] Initialized")
    }

    public getNode() {
        return process.versions.node;
    }

    public getElectron() {
        return process.versions.electron;
    }

    public getChromium() {
        return process.versions.chrome;
    }

    public getPlatform() {
        return process.platform;
    }

    public getArch() {
        return process.arch;
    }
}

export const versionService = VersionService.getInstance();
