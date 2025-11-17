<template>
    <SettingsGroup>
        <SettingsGroupItem :title="t('pages.settings.appearance.theme.title')">
            <div class="w-[120px]">
                <ElSelect v-model:model-value="settings.themeMode">
                    <ElOption
                        v-for="item in themeSelectOptions"
                        :="item"
                    />
                </ElSelect>
            </div>
        </SettingsGroupItem>

        <SettingsGroupItem :title="t('pages.settings.appearance.language.title')">
            <div class="w-[200px]">
                <ElSelect v-model:model-value="settings.language">
                    <ElOption
                        v-for="item in languageOptions"
                        :="item"
                    />
                </ElSelect>
            </div>
        </SettingsGroupItem>
    </SettingsGroup>
</template>

<script setup lang="ts">
import { ElOption, ElSelect } from "element-plus";
import SettingsGroup from "../SettingsGroup.vue";
import { computed } from "vue";
import SettingsGroupItem from "../SettingsGroupItem.vue";
import { THEME_MODE } from "@shared";
import { useLanguage } from "@renderer/hooks/useLanguage";
import { LANGUAGES } from "@renderer/constants";
import { useSettingsStore } from "@renderer/stores";

const { t } = useLanguage();
const settings = useSettingsStore();
const themeSelectOptions = computed<Array<Record<"value" | "label", string>>>(() => [
    {
        label: t("pages.settings.appearance.theme.light"),
        value: THEME_MODE.LIGHT,
    },
    {
        label: t("pages.settings.appearance.theme.dark"),
        value: THEME_MODE.DARK,
    },
    {
        label: t("pages.settings.appearance.theme.system"),
        value: THEME_MODE.SYSTEM,
    },
]);
const languageOptions = computed<Array<Record<"value" | "label", string>>>(() =>
    LANGUAGES.map(({ code, label }) => ({ label, value: code })),
);
</script>
