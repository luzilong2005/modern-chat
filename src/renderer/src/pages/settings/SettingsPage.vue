<template>
    <div class="bg-mc-background flex h-screen w-screen flex-col">
        <AppTitleBar :title="t('window.settings')" />
        <div class="flex h-[calc(100%-40px)] w-full">
            <SettingsMenuView />
            <div class="border-mc-border h-full border-r"></div>
            <ElScrollbar class="flex-1 px-3">
                <RouterView />
            </ElScrollbar>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AppTitleBar } from "@renderer/components/AppTitleBar";
import SettingsMenuView from "./SettingsMenuView.vue";
import { ElScrollbar } from "element-plus";
import { useLanguage } from "@renderer/hooks/useLanguage";
const { t } = useLanguage();
</script>
