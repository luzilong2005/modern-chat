<template>
    <ElConfigProvider>
        <RouterView />
    </ElConfigProvider>
    <LanguageService />
    <ThemeService />
    <TrayService />
    <ContextMenuService />
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import ThemeService from "./components/services/ThemeService.vue";
import TrayService from "./components/services/TrayService.vue";
import ContextMenuService from "./components/services/ContextMenuService.vue";
import { onMounted } from "vue";
import { useGlobalsStore } from "./stores";
import LanguageService from "./components/services/LanguageService.vue";

useGlobalsStore();
onMounted(() => {});
</script>
