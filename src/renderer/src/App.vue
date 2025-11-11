<template>
    <NConfigProvider
        class="bg-mc-background relative h-screen w-screen"
        :theme="theme"
    >
        <RouterView />
        <TrayService />
        <LanguageService />
    </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, darkTheme, lightTheme } from "naive-ui";
import { computed } from "vue";
import { useGlobalsStore } from "./stores";
import TrayService from "./components/services/TrayService.vue";
import LanguageService from "./components/services/LanguageService.vue";

const globals = useGlobalsStore();
const theme = computed(() => (globals.isDark ? darkTheme : lightTheme));
</script>
