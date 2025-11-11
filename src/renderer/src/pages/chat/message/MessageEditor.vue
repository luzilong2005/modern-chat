<template>
    <div :class="['mt-auto flex h-60 w-full flex-col rounded-md p-3', 'bg-mc-input-box']">
        <textarea
            class="scrollbar-hide caret-mc-cursor text-mc-text-primary h-full w-full resize-none outline-none"
            style="scrollbar-width: none"
        ></textarea>
        <div class="flex h-10 items-center">
            <ModelSelector />
            <span class="flex-auto"></span>
            <NButton
                circle
                disabled
            >
                <template #icon>
                    <SendHorizontalIcon />
                </template>
            </NButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import ModelSelector from "./ModelSelector.vue";
import { SendHorizontalIcon } from "lucide-vue-next";
import { NButton } from "naive-ui";
</script>
