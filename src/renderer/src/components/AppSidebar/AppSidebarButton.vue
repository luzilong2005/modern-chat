<template>
    <IconButton
        placement="right"
        :tooltip="props.tooltip"
        @click="emit('click', $event)"
    >
        <component
            class="size-7"
            :class="[props.active ? 'text-mc-primary' : 'text-mc-text-primary']"
            :is="props.icon"
            stroke-width="1.5"
        />
    </IconButton>
</template>

<script setup lang="ts">
import { IconButton, type IconButtonProps, type IconButtonEmits } from "../IconButton";

interface Props extends Pick<IconButtonProps, "icon" | "tooltip"> {
    active?: boolean;
}

interface Emits extends IconButtonEmits {}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
