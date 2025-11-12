<template>
    <div class="flex w-full flex-col">
        <p class="text-xl leading-12 font-bold text-white">{{ props.title }}</p>
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
