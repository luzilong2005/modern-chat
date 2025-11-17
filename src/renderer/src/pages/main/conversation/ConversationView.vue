<template>
    <div class="flex h-full w-full flex-col">
        <div class="flex h-20 flex-col items-center justify-end px-2.5 pb-2.5">
            <ElButton
                class="w-full"
                size="large"
                @click="handleAddConversation"
            >
                <span class="text-mc-text-primary flex items-center space-x-2.5">
                    <MessageSquarePlusIcon class="size-5" />
                    <p>添加</p>
                </span>
            </ElButton>
        </div>
        <div class="max-h-[calc(100%-80px)]">
            <ElScrollbar>
                <div class="space-y-2.5 px-2.5">
                    <ConversationBox
                        v-for="data in globals.conversations"
                        :data="data"
                    />
                </div>
            </ElScrollbar>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElButton, ElScrollbar } from "element-plus";
import { MessageSquarePlusIcon } from "lucide-vue-next";
import ConversationBox from "./ConversationBox.vue";
import { onBeforeMount } from "vue";
import { ipc } from "@renderer/apis/ipc";
import dayjs from "dayjs";
import { useGlobalsStore } from "@renderer/stores";

const globals = useGlobalsStore();
const handleAddConversation = async () => {
    const result = await ipc.invoke("db:add-conversation", { title: dayjs().format("HH:mm:ss") });
    globals.conversations.push(result);
};

onBeforeMount(async () => {
    globals.$patch({ conversations: await ipc.invoke("db:get-conversations") });
    if (globals.conversations.length > 0) globals.currentConversationId = globals.conversations[0].id;
});
</script>
