<template>
    <div class="flex w-full flex-col">
        <p class="text-xl font-bold text-white leading-12">{{ props.title }}</p>
        <div class="flex flex-col rounded-md bg-neutral-700 p-4">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title: string;
}

const props = defineProps<Props>();
</script>
