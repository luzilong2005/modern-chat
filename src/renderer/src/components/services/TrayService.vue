<template></template>
<script setup lang="ts">
import { ipc } from "@renderer/apis";
import { type I18nMessageSchema } from "@renderer/i18n";
import { useSettingsStore } from "@renderer/stores";
import { TRAY_CONTEXTMENU_CODE, WINDOW_NAME } from "@shared";
import { watchEffect } from "vue";
import { useI18n } from "vue-i18n";
const settings = useSettingsStore();
const openTray = async () => {
    const { t } = useI18n<{ message: I18nMessageSchema }>();
    await ipc.invoke("tray:open", [
        {
            code: TRAY_CONTEXTMENU_CODE.OPEN_MAIN_WINDOW,
            label: t("app.tray.openMainWindow"),
        },
        {
            code: TRAY_CONTEXTMENU_CODE.QUIT,
            label: t("app.tray.quit"),
        },
    ]);
    ipc.on("tray:clicked", (_, code) => {
        if (code === TRAY_CONTEXTMENU_CODE.OPEN_MAIN_WINDOW) ipc.invoke("window:open", WINDOW_NAME.MAIN, "/main");
        if (code === TRAY_CONTEXTMENU_CODE.QUIT) ipc.invoke("app:quit");
    });
};

const closeTray = () => {
    ipc.invoke("tray:close");
};

watchEffect(() => {
    if (settings.trayEnabled) openTray();
    else closeTray();
});
</script>
