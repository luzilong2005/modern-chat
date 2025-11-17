<template>
    <div :class="['flex h-60 w-full flex-col rounded-md p-3', 'bg-mc-input-box']">
        <textarea
            class="scrollbar-hide caret-mc-cursor text-mc-text-primary h-full w-full resize-none outline-none"
            v-model="content"
            style="scrollbar-width: none"
        ></textarea>
        <div class="flex h-10 items-center">
            <div class="min-w-[140px]">
                <ElSelect v-model:model-value="currentModelConfig">
                    <ElOption
                        v-for="item in settings.modelConfigs"
                        :value="item.model"
                        :label="item.model"
                    />
                </ElSelect>
            </div>
            <span class="flex-auto"></span>
            <ElButton
                :disabled="!currentModelConfig || (!content.trim() && chatState === CHAT_STATE.STOPPED)"
                @click="handleSendMessage"
            >
                <template #icon>
                    <SendHorizontalIcon />
                </template>
                <p v-if="chatState === CHAT_STATE.STOPPED">发送</p>
                <p v-else>暂停</p>
            </ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SendHorizontalIcon } from "lucide-vue-next";
import { ElButton, ElSelect, ElOption } from "element-plus";
import { ref, shallowRef, toRaw } from "vue";
import { useSettingsStore } from "@renderer/stores";
import { AIModelConfig, CHAT_STATE } from "@shared";

interface Emits {
    sendMessage: [config: AIModelConfig, content: string];
}
const emit = defineEmits<Emits>();
const chatState = defineModel("chatState", { default: CHAT_STATE.STOPPED });
const settings = useSettingsStore();
const content = shallowRef("");
const currentModelConfig = ref<AIModelConfig | null>(settings.modelConfigs.at(0) ?? null);
const handleSendMessage = () => {
    if (!currentModelConfig.value) return;
    emit("sendMessage", toRaw(currentModelConfig.value), toRaw(content.value));
    content.value = "";
};
</script>
