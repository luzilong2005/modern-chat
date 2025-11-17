import { BaseSingleton } from "../BaseSingleton";

export abstract class BaseService extends BaseSingleton {
    private isInitialized = false;
    public constructor() {
        super();
    }
    protected abstract setupIpcEvents?(): void;
    public init() {
        if (this.isInitialized) return;
        this.isInitialized = true;
        this.setupIpcEvents?.();
    }
}
