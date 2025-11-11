import { BaseService } from "./BaseService";
import { ipc } from "./ipc";

class VersionService extends BaseService {
    private static instance: VersionService | null = null;

    private constructor() {
        super();
    }

    private setupIpcEvents() {
        ipc.handle("version:node", () => this.getNode());
        ipc.handle("version:electron", () => this.getElectron());
        ipc.handle("version:chromium", () => this.getChromium());
        ipc.handle("version:platform", () => this.getPlatform());
        ipc.handle("version:arch", () => this.getArch());
    }

    public init() {
        super.init();
        this.setupIpcEvents();
    }

    public static getInstance() {
        return VersionService.instance || (VersionService.instance = new VersionService());
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
