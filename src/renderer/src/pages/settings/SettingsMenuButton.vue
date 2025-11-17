<template>
    <button
        :class="[
            'app-no-draggable hover:bg-mc-hover text-mc-text-primary flex h-10 cursor-pointer items-center rounded-md',
            {
                'bg-mc-active': isActive,
            },
        ]"
        @click="handleClick"
    >
        <span class="flex size-12 items-center justify-center">
            <component
                class="size-4.5"
                :is="props.icon"
            />
        </span>
        <span class="flex flex-1 items-center text-sm">
            <p>{{ props.label }}</p>
        </span>
    </button>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";
import { useRoute, useRouter } from "vue-router";

interface Props {
    label: string;
    icon: Component;
    routePath: string;
}

interface Emits {
    click: [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const route = useRoute();
const router = useRouter();
const isActive = computed(() => props.routePath === route.path);
const handleClick = () => {
    router.push(props.routePath);
    emit("click");
};
</script>
