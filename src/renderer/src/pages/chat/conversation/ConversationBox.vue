<template>
    <div class="hover:bg-mc-hover flex h-12 w-full items-center justify-between space-x-3 rounded-lg px-3">
        <p
            class="text-mc-text-primary truncate text-sm select-none"
            :title="props.data.title"
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
import { useContextmenu } from "@renderer/hooks";
import { CONTEXTMENU_CODE } from "@shared";
import { MoreHorizontalIcon } from "lucide-vue-next";

interface Props {
    data: {
        id: number;
        title: string;
        updateDate: Date;
    };
}
const props = defineProps<Props>();

const { openContextmenu } = useContextmenu();
const handleOpenContextmenu = async () => {
    openContextmenu([CONTEXTMENU_CODE.COPY, CONTEXTMENU_CODE.DELETE]);
};
</script>
