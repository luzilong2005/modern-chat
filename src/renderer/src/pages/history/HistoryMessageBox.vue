<template>
    <div class="hover:bg-mc-hover flex w-full items-center rounded-md p-2">
        <p class="flex-1 truncate">{{ props.data.title }}</p>
        <div class="ml-auto">
            <ElButton
                type="danger"
                text
                circle
                @click="handleDeleteConversation"
            >
                <template #icon>
                    <Trash2Icon />
                </template>
            </ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ipc } from "@renderer/apis/ipc";
import { ConversationData } from "@shared";
import { ElButton } from "element-plus";
import { Trash2Icon } from "lucide-vue-next";

interface Props {
    data: ConversationData;
}

interface Emits {
    deleted: [id: bigint];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const handleDeleteConversation = async () => {
    const { response } = await ipc.invoke("dialog:message", {
        title: "Delete",
        message: "Delete ?",
        cancelId: 0,
        buttons: ["cancel", "ok"],
    });
    if (response === 1) {
        await ipc.invoke("db:delete-conversation", props.data.id);
        emit("deleted", props.data.id);
    }
};
</script>
