<template>
    <aside class="bg-mc-app-sidebar border-mc-border app-draggable flex h-screen w-15 shrink-0 flex-col border-r">
        <header class="border-mc-border flex h-20 flex-col items-center justify-end border-b pb-2.5">
            <BotIcon
                class="text-mc-primary size-10"
                :stroke-width="1.5"
            />
        </header>
        <nav class="mt-3 flex flex-col items-center space-y-2.5">
            <AppSidebarButton
                :icon="MessageSquareIcon"
                :active="route.name === PAGE_ROUTE_PATH.CHAT"
                :tooltip="t('sidebar.chat')"
                @click="handleToChatPage"
            />
            <AppSidebarButton
                :icon="HistoryIcon"
                :active="route.path === PAGE_ROUTE_PATH.HISTORY"
                :tooltip="t('sidebar.history')"
                @click="handleToHistoryPage"
            />
        </nav>
        <footer class="mt-auto mb-3 flex flex-col items-center space-y-2.5">
            <AppSidebarButton
                :icon="InfoIcon"
                :tooltip="t('sidebar.about')"
                @click="handleOpenAboutWindow"
            />
            <AppSidebarButton
                :icon="SettingsIcon"
                :tooltip="t('sidebar.settings')"
                @click="handleOpenSettingsWindow"
            />
        </footer>
    </aside>
</template>

<script setup lang="ts">
import AppSidebarButton from "./AppSidebarButton.vue";
import { BotIcon, HistoryIcon, InfoIcon, MessageSquareIcon, SettingsIcon } from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";
import { PAGE_ROUTE_PATH } from "@renderer/enums";
import { ipc } from "@renderer/apis/ipc";
import { WINDOW_NAME } from "@shared";
import { useLanguage } from "@renderer/hooks/useLanguage";
import { useGlobalsStore } from "@renderer/stores";
const route = useRoute();
const router = useRouter();
const { t } = useLanguage();
const globals = useGlobalsStore();
const handleToChatPage = () => {
    if (globals.conversations.length > 0) {
        router.push(PAGE_ROUTE_PATH.CHAT);
    }
};
const handleToHistoryPage = () => router.push(PAGE_ROUTE_PATH.HISTORY);
const handleOpenAboutWindow = () => {
    ipc.invoke("window:open", WINDOW_NAME.ABOUT, PAGE_ROUTE_PATH.ABOUT);
};
const handleOpenSettingsWindow = () => {
    ipc.invoke("window:open", WINDOW_NAME.SETTINGS, PAGE_ROUTE_PATH.SETTINGS);
};
</script>
