<template>
    <SettingsGroup :title="t('pages.settings.appearance.title')">
        <SettingsGroupItem :title="t('pages.settings.appearance.theme')">
            <span class="w-[200px]">
                <NSelect
                    :options="themeOptions"
                    :default-value="settings.themeMode"
                    @update-value="(v) => settings.$patch({ themeMode: v })"
                />
            </span>
        </SettingsGroupItem>
        <NDivider />
        <SettingsGroupItem :title="t('pages.settings.appearance.language')">
            <span class="w-[200px]">
                <NSelect
                    :options="languageOptions"
                    :default-value="settings.language"
                    @update-value="(v) => settings.$patch({ language: v })"
                />
            </span>
        </SettingsGroupItem>
    </SettingsGroup>
</template>

<script setup lang="ts">
import SettingsGroup from "../SettingsGroup.vue";
import SettingsGroupItem from "../SettingsGroupItem.vue";
import { LANGUAGES } from "@renderer/constants";
import { I18nMessageSchema } from "@renderer/i18n";
import { useSettingsStore } from "@renderer/stores";
import { THEME_MODE } from "@shared";
import { NSelect, NDivider } from "naive-ui";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const settings = useSettingsStore();
const { t } = useI18n<{ message: I18nMessageSchema }>();

const themeOptions = computed(() => [
    {
        label: t("pages.settings.appearance.themeSelector.light"),
        value: THEME_MODE.LIGHT,
    },
    {
        label: t("pages.settings.appearance.themeSelector.dark"),
        value: THEME_MODE.DARK,
    },
    {
        label: t("pages.settings.appearance.themeSelector.system"),
        value: THEME_MODE.SYSTEM,
    },
]);

const languageOptions = computed(() => LANGUAGES.map(({ code, label }) => ({ label, value: code })));
</script>
