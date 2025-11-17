import { defaultLanguage } from "@renderer/i18n";
import { THEME_MODE, type AIModelConfig } from "@shared";
import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";

const setup = () => {
    const language = shallowRef(defaultLanguage);
    const enableTray = shallowRef(false);
    const themeMode = shallowRef<THEME_MODE>(THEME_MODE.SYSTEM);
    const modelConfigs = ref<AIModelConfig[]>([]);
    return {
        language,
        enableTray,
        themeMode,
        modelConfigs,
    };
};

export const useSettingsStore = defineStore("settings", setup, { persist: true });
