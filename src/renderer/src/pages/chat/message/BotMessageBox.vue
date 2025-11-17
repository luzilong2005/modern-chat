<template>
    <div class="flex flex-col space-y-2">
        <p
            class="text-mc-text-primary max-w-2/3 rounded-md bg-neutral-700 p-3 text-sm"
            v-if="html"
            v-html="html"
        ></p>
        <p
            class="text-mc-text-secondary max-w-2/3 rounded-md bg-neutral-600 p-3 text-sm"
            v-else
        >
            正在加载…
        </p>

        <span class="text-mc-text-secondary text-xs">
            {{ dayjs(props.data.updatedDate).format("HH:mm") }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { MessageData } from "@shared";
import dayjs from "dayjs";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { ref, watchEffect } from "vue";

const props = defineProps<{ data: MessageData }>();
const html = ref("");

watchEffect(async () => {
    html.value = "";
    const raw = await marked.parse(props.data.content);
    html.value = DOMPurify.sanitize(raw);
});
</script>
