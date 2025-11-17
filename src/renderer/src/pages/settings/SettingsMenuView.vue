<template>
    <div class="flex h-full w-[220px] shrink-0 flex-col space-y-2.5 px-2.5">
        <template v-for="item in menuButtonOptions">
            <SettingsMenuButton :="item" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { type Component, computed } from "vue";
import SettingsMenuButton from "./SettingsMenuButton.vue";
import { AppWindowIcon, WrenchIcon } from "lucide-vue-next";
import { SETTINGS_ROUTE_PATH } from "@renderer/enums";
import { useLanguage } from "@renderer/hooks/useLanguage";

interface MenuButtonProps {
    label: string;
    icon: Component;
    routePath: string;
}

const { t } = useLanguage();
const menuButtonOptions = computed<Array<MenuButtonProps>>(() => [
    {
        label: t("pages.settings.appearance.title"),
        icon: AppWindowIcon,
        routePath: SETTINGS_ROUTE_PATH.APPEARANCE,
    },
    {
        label: t('pages.settings.advanced.title'),
        icon: WrenchIcon,
        routePath: SETTINGS_ROUTE_PATH.ADVANCED,
    },
]);
</script>
