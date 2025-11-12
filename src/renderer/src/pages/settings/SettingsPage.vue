<template>
    <div :class="['flex h-screen w-screen flex-col', 'bg-mc-background']">
        <AppTitleBar :title="t('window.settings')" />
        <NScrollbar class="px-4 pb-4">
            <AppearanceSettings />
            <AdvancedSettings />
        </NScrollbar>
    </div>
</template>

<script setup lang="ts">
import AdvancedSettings from "./groups/AdvancedSettings.vue";
import AppearanceSettings from "./groups/AppearanceSettings.vue";
import { AppTitleBar } from "@renderer/components/AppTitleBar";
import { type I18nMessageSchema } from "@renderer/i18n";
import { NScrollbar } from "naive-ui";
import { useI18n } from "vue-i18n";

const { t } = useI18n<{ message: I18nMessageSchema }>();
</script>
