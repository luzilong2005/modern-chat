import { Menu, MenuItem } from "electron";
import { BaseService } from "./BaseService";
import { ipc } from "../ipc";
import { LOG_INFO } from "./log";

class ContextMenuService extends BaseService {
    public constructor() {
        super();
    }

    protected setupIpcEvents() {
        ipc.handle("contextmenu:open", (_, templates) => {
            return new Promise((resolve) => {
                Menu.buildFromTemplate(
                    templates.map(({ code, label }) => {
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

    public init() {
        super.init();
        LOG_INFO("[ContextMenuService] Initialized");
    }
}

export const contextMenuService = ContextMenuService.getInstance();
