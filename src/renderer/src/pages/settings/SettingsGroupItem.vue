<template>
    <div class="flex h-12 w-full items-center justify-between rounded-lg bg-neutral-700 p-3">
        <div
            class="overflow-hidden"
            v-if="!!props.title"
        >
            <p class="text-mc-text-primary truncate">{{ props.title }}</p>
        </div>
        <div class="ml-auto">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title?: string;
}
const props = defineProps<Props>();
</script>
