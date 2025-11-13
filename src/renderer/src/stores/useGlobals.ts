import { useDark, useToggle } from "@vueuse/core";
import { defineStore } from "pinia";
import { shallowRef } from "vue";

const setup = () => {
    const conversationExpanded = shallowRef(false);
    const isDark = useDark();
    const toggleConversationExpanded = useToggle(conversationExpanded);
    const currentModel = shallowRef<string | null>(null);
    return {
        isDark,
        conversationExpanded,
        toggleConversationExpanded,
        currentModel,
    };
};

export const useGlobalsStore = defineStore("globals", setup, { persist: true });
