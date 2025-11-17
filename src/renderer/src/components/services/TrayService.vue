<template></template>

<script setup lang="ts">
import { useTray } from "@renderer/hooks/useTray";
import { useSettingsStore } from "@renderer/stores";
import { TRAY_CONTEXTMENU_CODE } from "@shared";
import { watchEffect } from "vue";

const settings = useSettingsStore();
const { openTray, closeTray } = useTray();
watchEffect(() => {
    if (settings.enableTray) openTray([TRAY_CONTEXTMENU_CODE.OPEN_MAIN_WINDOW, TRAY_CONTEXTMENU_CODE.QUIT]);
    else closeTray();
});
</script>
