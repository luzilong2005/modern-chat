import { CONTEXTMENU_CODE } from "@shared";
import { useLanguage } from "./useLanguage";
import { ipc } from "@renderer/apis/ipc";

export const useContextMenu = () => {
    const { t } = useLanguage();
    const templates = {
        [CONTEXTMENU_CODE.DELETE]: t("contextmenu.delete"),
    };
    const openContextMenu = (codes: CONTEXTMENU_CODE[]) => {
        return ipc.invoke(
            "contextmenu:open",
            codes.map((code) => ({ code, label: templates[code] })),
        );
    };
    return {
        openContextMenu,
    };
};
