<template>
    <div class="flex flex-col items-end space-y-2">
        <p class="p-3 text-mc-text-primary text-sm max-w-2/3 bg-neutral-700 rounded-md">
            {{ props.data.content }}
        </p>
        <span class="text-mc-text-secondary text-xs">
            {{ dayjs(props.data.updatedDate).format("HH:mm") }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { MessageData } from "@shared";
import dayjs from "dayjs";

const props = defineProps<{ data: MessageData }>();
</script>
