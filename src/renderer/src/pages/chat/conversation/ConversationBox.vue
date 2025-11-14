<template>
    <div class="hover:bg-mc-hover flex h-12 w-full items-center justify-between space-x-3 rounded-lg px-3">
        <p
            class="text-mc-text-primary truncate text-sm select-none"
            :title="props.data.title"
            @click="handleClick"
        >
            {{ props.data.title }}
        </p>
        <IconButton
            class="size-8"
            placement="right"
            @click="handleOpenContextmenu"
        >
            <MoreHorizontalIcon class="text-mc-text-secondary hover:text-mc-text-primary size-5" />
        </IconButton>
    </div>
</template>

<script setup lang="ts">
import { IconButton } from "@renderer/components/IconButton";
import { ROUTE_NAME } from "@renderer/enums";
import { useContextmenu } from "@renderer/hooks";
import { CONTEXTMENU_CODE, ConversationData } from "@shared";
import { MoreHorizontalIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";

interface Props {
    data: ConversationData;
}

const props = defineProps<Props>();
const router = useRouter();
const { openContextmenu } = useContextmenu();

const handleOpenContextmenu = async () => {
    openContextmenu([CONTEXTMENU_CODE.COPY, CONTEXTMENU_CODE.DELETE]);
};

const handleClick = () => {
    router.push({ name: ROUTE_NAME.CHAT, params: { conversationId: props.data.id } });
};
</script>
