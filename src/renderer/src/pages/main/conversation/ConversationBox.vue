<template>
    <div class="hover:bg-mc-hover flex h-12 w-full items-center justify-between space-x-3 rounded-lg px-3">
        <p
            class="text-mc-text-primary flex-1 truncate text-sm select-none"
            :title="props.data.title"
            @click="handleClick"
        >
            {{ props.data.title }}
        </p>
        <IconButton
            class="size-8"
            placement="right"
            @click="handleContextMenu"
        >
            <MoreHorizontalIcon class="text-mc-text-secondary hover:text-mc-text-primary size-5" />
        </IconButton>
    </div>
</template>

<script setup lang="ts">
import { ipc } from "@renderer/apis/ipc";
import { IconButton } from "@renderer/components/IconButton";
import { PAGE_ROUTE_PATH } from "@renderer/enums";
import { useContextMenu } from "@renderer/hooks/useContextMenu";
import { useGlobalsStore } from "@renderer/stores";
import { CONTEXTMENU_CODE, ConversationData } from "@shared";
import { MoreHorizontalIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";

interface Props {
    data: ConversationData;
}

const props = defineProps<Props>();
const router = useRouter();
const { openContextMenu } = useContextMenu();
const globals = useGlobalsStore();
const handleClick = () => {
    router.push({
        path: `${PAGE_ROUTE_PATH.CHAT}/${String(props.data.id)}`,
        query: {
            title: props.data.title,
        },
    });
};

const handleContextMenu = async (ev: MouseEvent) => {
    ev.preventDefault();
    const code = await openContextMenu([CONTEXTMENU_CODE.DELETE]);
    if (code === CONTEXTMENU_CODE.DELETE) {
        await ipc.invoke("db:delete-conversation", props.data.id);
        globals.conversations.splice(globals.conversations.indexOf(props.data), 1);
    }
};
</script>
