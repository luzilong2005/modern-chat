<template>
    <div class="h-hull flex w-full flex-col">
        <AppTitleBar />
        <NScrollbar style="height: calc(100vh - 240px - 40px)">
            <div class="p-4">
                <template v-for="item in messages">
                    <UserMessageBox
                        v-if="item.role === 'user'"
                        :data="item"
                    />
                    <BotMessageBox
                        v-else-if="item.role === 'assistant'"
                        :data="item"
                    />
                </template>
            </div>
        </NScrollbar>
        <MessageEditor />
    </div>
</template>

<script setup lang="ts">
import { AppTitleBar } from "@renderer/components/AppTitleBar";
import { NScrollbar } from "naive-ui";
import MessageEditor from "./MessageEditor.vue";
import UserMessageBox from "./UserMessageBox.vue";
import BotMessageBox from "./BotMessageBox.vue";
import { onBeforeMount, reactive } from "vue";
import { MessageData } from "@shared";
import { ipc } from "@renderer/apis";
import { useRoute } from "vue-router";

const route = useRoute();
const messages = reactive<MessageData[]>([]);

onBeforeMount(async () => {
    if (route.query.conversationId) {
        const conversationId = Number(route.query.conversationId);
        messages.push(...(await ipc.invoke("db:get-messages", conversationId)));
    }
});
</script>
