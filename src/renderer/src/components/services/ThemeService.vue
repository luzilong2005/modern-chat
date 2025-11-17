<template></template>

<script setup lang="ts">
import { ipc } from "@renderer/apis/ipc";
import { useSettingsStore } from "@renderer/stores";
import { watchEffect } from "vue";

const settings = useSettingsStore();
watchEffect(() => {
    if (settings.themeMode) ipc.invoke("theme:set-mode", settings.themeMode);
});
</script>
