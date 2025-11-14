<template>
    <div :class="['mt-auto flex h-60 w-full flex-col rounded-md p-3', 'bg-mc-input-box']">
        <textarea
            class="scrollbar-hide caret-mc-cursor text-mc-text-primary h-full w-full resize-none outline-none"
            v-model="content"
            style="scrollbar-width: none"
        ></textarea>
        <div class="flex h-10 items-center">
            <ModelSelector />
            <span class="flex-auto"></span>
            <NButton
                :disabled="!content.length"
                @click="handleSendMessage"
            >
                <template #icon>
                    <SendHorizontalIcon />
                </template>
                <p>发送</p>
            </NButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ipc } from "@renderer/apis";
import ModelSelector from "./ModelSelector.vue";
import { SendHorizontalIcon } from "lucide-vue-next";
import { NButton } from "naive-ui";
import { shallowRef, toRaw } from "vue";
import { useSettingsStore } from "@renderer/stores";

const settings = useSettingsStore();
const content = shallowRef("");
const handleSendMessage = () => {
    ipc.invoke("openai:send-message", toRaw(settings.modelConfigs[0]), [], content.value);
    ipc.on("openai:chat-stream", (_, chunk) => {});
};
</script>
