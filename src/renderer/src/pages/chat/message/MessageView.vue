<template>
    <div class="flex h-[calc(100%-40px)] flex-col">
        <div class="h-[calc(100%-240px)]">
            <ElScrollbar>
                <div class="space-y-6 p-6">
                    <template
                        v-for="data in messages"
                        :key="data.id"
                    >
                        <UserMessageBox
                            v-if="data.role === 'user'"
                            :data="data"
                        />
                        <BotMessageBox
                            v-if="data.role === 'assistant'"
                            :data="data"
                        />
                    </template>
                </div>
            </ElScrollbar>
        </div>
        <MessageEditor @send-message="handleSendMessage" v-model:chat-state="chatState"/>
    </div>
</template>

<script setup lang="ts">
import MessageEditor from "./MessageEditor.vue";
import { ElScrollbar } from "element-plus";
import { useRouteParams } from "@vueuse/router";
import UserMessageBox from "./UserMessageBox.vue";
import BotMessageBox from "./BotMessageBox.vue";
import { onBeforeMount, reactive, shallowRef } from "vue";
import { ipc } from "@renderer/apis/ipc";
import { AIModelConfig, CHAT_STATE, MessageData } from "@shared";
import { isNull } from "es-toolkit";
const conversationId = useRouteParams("conversationId", "-1", { transform: BigInt });
const messages = reactive<MessageData[]>([]);
const chatState = shallowRef(CHAT_STATE.STOPPED);
const handleSendMessage = async (config: AIModelConfig, content: string) => {
    const result = await ipc.invoke("db:add-message", conversationId.value, "user", content);
    messages.push(result);
    await ipc.invoke("openai:send-message", config, conversationId.value, content);
};

onBeforeMount(async () => {
    messages.push(...(await ipc.invoke("db:get-messages", conversationId.value)));
});

ipc.on("openai:start-chat", () => {
    chatState.value = CHAT_STATE.RUNNING;
    messages.push({
        id: BigInt(-2),
        conversationId: conversationId.value,
        role: "assistant",
        content: "",
        model: "hello",
        createdDate: new Date(),
        updatedDate: new Date(),
    });
});

ipc.on("openai:chat-stream", (_, chunk) => {
    chatState.value = CHAT_STATE.RUNNING;
    if (!isNull(chunk)) messages[messages.length - 1].content += chunk;
});

ipc.on("openai:chat-end", () => {
    chatState.value = CHAT_STATE.STOPPED;
    ipc.invoke("db:add-message", conversationId.value, "assistant", messages[messages.length - 1].content);
});
</script>
