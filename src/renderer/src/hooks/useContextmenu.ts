import { ipc } from "@renderer/apis";
import { i18n } from "@renderer/i18n";
import { CONTEXTMENU_CODE } from "@shared";

const { t } = i18n.global;
const contextmenuTemplate = {
    [CONTEXTMENU_CODE.COPY]: t("app.contextmenu.copy"),
    [CONTEXTMENU_CODE.DELETE]: t("app.contextmenu.delete"),
    [CONTEXTMENU_CODE.RENAME]: t("app.contextmenu.rename"),
    [CONTEXTMENU_CODE.REFRESH]: t("app.contextmenu.refresh"),
    [CONTEXTMENU_CODE.TOP]: t("app.contextmenu.top"),
} satisfies Record<CONTEXTMENU_CODE, string>;

export const useContextmenu = () => {
    const openContextmenu = (codes: CONTEXTMENU_CODE[]) => {
        return ipc.invoke(
            "contextmenu:open",
            codes.map((code) => ({ code, label: contextmenuTemplate[code] })),
        );
    };

    return {
        openContextmenu,
    };
};
