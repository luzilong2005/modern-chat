<template>
    <div class="flex w-full flex-col">
        <p class="leading-10 text-white">{{ props.title }}</p>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title: string;
}

const props = defineProps<Props>();
</script>
