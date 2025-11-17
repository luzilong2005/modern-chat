<template>
    <ElTooltip
        :placement="props.placement"
        :delay="700"
        :disabled="!props.tooltip"
        :content="props.tooltip"
    >
        <button
            :class="
                twMerge(
                    'app-no-draggable text-mc-text-primary hover:bg-mc-hover flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md outline-none',
                    props.class,
                )
            "
            @click="emit('click', $event)"
        >
            <span v-if="!props.icon">
                <slot></slot>
            </span>
            <component :is="props.icon" />
        </button>
    </ElTooltip>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";
import { IconButtonEmits, IconButtonProps } from "./types";
import { twMerge } from "tailwind-merge";
const props = defineProps<IconButtonProps>();
const emit = defineEmits<IconButtonEmits>();
</script>
