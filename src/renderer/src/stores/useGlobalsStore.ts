import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import { useDark } from "@vueuse/core";
import type { ConversationData, MessageData } from "@shared";
const setup = () => {
    const isChatPageExpanded = shallowRef(false);
    const isDark = useDark();
    const conversations = ref(new Array<ConversationData>());
    const messages = ref(new Array<MessageData>());
    const currentConversationId = shallowRef<bigint | null>(null);
    return {
        isChatPageExpanded,
        isDark,
        conversations,
        messages,
        currentConversationId,
    };
};

export const useGlobalsStore = defineStore("globals", setup, { persist: { omit: ["conversations", "messages"] } });
