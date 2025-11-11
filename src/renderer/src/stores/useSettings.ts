import { THEME_MODE } from "@shared";
import { defineStore } from "pinia";
import { shallowRef } from "vue";

const setup = () => {
    const themeMode = shallowRef<THEME_MODE>(THEME_MODE.SYSTEM);
    const language = shallowRef<string>("zh-CN");
    const trayEnabled = shallowRef<boolean>(true);

    return {
        themeMode,
        language,
        trayEnabled,
    };
};

export const useSettingsStore = defineStore("settings", setup, { persist: true });
