import { Menu, MenuItem } from "electron";
import { BaseService } from "./BaseService";
import { ipc } from "./ipc";

class ContextmenuService extends BaseService {
    private static instance: ContextmenuService | null = null;
    private constructor() {
        super();
    }

    private setupIpcEvents() {
        ipc.handle("contextmenu:open", (_, template) => {
            return new Promise((resolve) => {
                Menu.buildFromTemplate(
                    template.map(({ code, label }) => {
                        return new MenuItem({
                            label,
                            click: () => {
                                resolve(code);
                            },
                        });
                    }),
                ).popup({ callback: () => resolve(null) });
            });
        });
    }

    public static getInstance() {
        return this.instance || (this.instance = new ContextmenuService());
    }

    public init() {
        super.init();
        this.setupIpcEvents();
    }
}

export const contextmenuService = ContextmenuService.getInstance();
