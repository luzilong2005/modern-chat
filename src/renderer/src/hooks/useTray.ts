import { ipc } from "@renderer/apis/ipc";
import { TRAY_CONTEXTMENU_CODE, WINDOW_NAME } from "@shared";
import { useLanguage } from "./useLanguage";
import { PAGE_ROUTE_PATH } from "@renderer/enums";

export const useTray = () => {
    const { t } = useLanguage();
    const templates = {
        [TRAY_CONTEXTMENU_CODE.OPEN_MAIN_WINDOW]: t("tray.open"),
        [TRAY_CONTEXTMENU_CODE.QUIT]: t("tray.quit"),
    };
    const openTray = (codes: TRAY_CONTEXTMENU_CODE[]) => {
        ipc.invoke(
            "tray:open",
            codes.map((code) => ({ code, label: templates[code] })),
        );
        ipc.on("tray:clicked", (_, code) => {
            switch (code) {
                case TRAY_CONTEXTMENU_CODE.OPEN_MAIN_WINDOW:
                    ipc.invoke("window:open", WINDOW_NAME.MAIN, PAGE_ROUTE_PATH.MAIN);
                    break;
                case TRAY_CONTEXTMENU_CODE.QUIT:
                    ipc.invoke("app:quit");
                    break;
            }
        });
    };
    const closeTray = () => {
        ipc.invoke("tray:close");
    };
    return { openTray, closeTray };
};
