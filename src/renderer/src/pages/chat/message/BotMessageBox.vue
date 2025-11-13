<template>
    <div class="flex flex-col space-y-2">
        <p class="text-mc-text-primary max-w-2/3 rounded-md bg-neutral-700 p-3 text-sm">{{ props.data.content }}</p>
        <span class="text-mc-text-secondary text-xs">{{ dayjs(props.data.updatedDate).format("HH:mm") }}</span>
    </div>
</template>

<script setup lang="ts">
import { MessageData } from "@shared";
import dayjs from "dayjs";

const props = defineProps<{ data: MessageData }>();
</script>
