export abstract class BaseService {
    protected initialized = false;
    protected init() {
        if (this.initialized) return;
        this.initialized = true;
    }
}
