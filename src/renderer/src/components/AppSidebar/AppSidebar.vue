<template>
    <aside class="bg-mc-app-sidebar border-mc-border app-draggable flex h-screen w-15 shrink-0 flex-col border-r">
        <header class="h-16"></header>
        <nav class="flex flex-col items-center space-y-2.5">
            <AppSidebarButton
                :icon="BotIcon"
                :active="route.name === ROUTE_NAME.CHAT"
                :tooltip="t('ui.sidebar.chat')"
                @click="handleToChatPage"
            />
            <AppSidebarButton
                :icon="HistoryIcon"
                :active="route.name === ROUTE_NAME.HISTORY"
                :tooltip="t('ui.sidebar.history')"
                @click="handleToHistoryPage"
            />
        </nav>
        <footer class="mt-auto mb-3 flex flex-col items-center space-y-2.5">
            <AppSidebarButton
                :icon="InfoIcon"
                :tooltip="t('ui.sidebar.about')"
                @click="handleOpenAboutWindow"
            />
            <AppSidebarButton
                :icon="SettingsIcon"
                :tooltip="t('ui.sidebar.settings')"
                @click="handleOpenSettingsWindow"
            />
        </footer>
    </aside>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import AppSidebarButton from "./AppSidebarButton.vue";
import { I18nMessageSchema } from "@renderer/i18n";
import { BotIcon, HistoryIcon, InfoIcon, SettingsIcon } from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";
import { ROUTE_NAME } from "@renderer/enums";
import { ipc } from "@renderer/apis";
import { WINDOW_NAME } from "@shared";
const { t } = useI18n<{ message: I18nMessageSchema }>();
const route = useRoute();
const router = useRouter();

const handleToChatPage = () => router.push({ name: ROUTE_NAME.CHAT });
const handleToHistoryPage = () => router.push({ name: ROUTE_NAME.HISTORY });
const handleOpenAboutWindow = () => ipc.invoke("window:open", WINDOW_NAME.ABOUT, "/about");
const handleOpenSettingsWindow = () => ipc.invoke("window:open", WINDOW_NAME.SETTINGS, "/settings");
</script>
