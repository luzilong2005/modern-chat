import { useDark } from "@vueuse/core";
import { defineStore } from "pinia";
import { shallowRef } from "vue";

const setup = () => {
    const conversationExpanded = shallowRef(false);
    const isDark = useDark();
    return {
        isDark,
        conversationExpanded,
    };
};

export const useGlobalsStore = defineStore("globals", setup, { persist: true });
