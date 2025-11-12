import { THEME_MODE, type AIModelConfig } from "@shared";
import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";

const setup = () => {
    const themeMode = shallowRef<THEME_MODE>(THEME_MODE.SYSTEM);
    const language = shallowRef<string>("zh-CN");
    const trayEnabled = shallowRef<boolean>(true);
    const aiModels = ref<Array<AIModelConfig & { id: string }>>([]);
    return {
        themeMode,
        language,
        trayEnabled,
        aiModels,
    };
};

export const useSettingsStore = defineStore("settings", setup, { persist: true });
