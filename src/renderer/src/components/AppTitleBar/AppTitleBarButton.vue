<template>
    <IconButton
        placement="bottom"
        :tooltip="props.tooltip"
        :class="twMerge('text-mc-text-primary size-6', props.class)"
    >
        <component
            class="size-5"
            :is="props.icon"
        />
    </IconButton>
</template>

<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { IconButton, type IconButtonProps } from "../IconButton";

interface Props extends Pick<IconButtonProps, "icon" | "tooltip" | "class"> {}

const props = defineProps<Props>();
</script>
