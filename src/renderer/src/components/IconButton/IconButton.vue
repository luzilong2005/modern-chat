<template>
    <NTooltip
        :placement="props.placement"
        :delay="700"
        :disabled="!props.tooltip"
    >
        <template #trigger>
            <button
                :class="
                    twMerge(
                        'app-no-draggable text-mc-text-primary hover:bg-mc-hover flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md',
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
        </template>
        <p
            class="text-mc-text-primary"
            v-if="!!props.tooltip"
        >
            {{ props.tooltip }}
        </p>
    </NTooltip>
</template>

<script setup lang="ts">
import { NTooltip } from "naive-ui";
import { IconButtonEmits, IconButtonProps } from "./types";
import { twMerge } from "tailwind-merge";
const props = defineProps<IconButtonProps>();
const emit = defineEmits<IconButtonEmits>();
</script>
