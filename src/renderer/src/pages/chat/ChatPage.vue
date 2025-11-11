<template>
    <NSplit
        min="300px"
        max="340px"
        default-size="340px"
    >
        <template #1>
            <ConversationView />
        </template>
        <template #2>
            <MessageView />
        </template>
        <template #resize-trigger>
            <div class="hover:border-mc-primary border-mc-border h-full border-r hover:border-2"></div>
        </template>
    </NSplit>
</template>

<script setup lang="ts">
import { NSplit } from "naive-ui";
import ConversationView from "./conversation/ConversationView.vue";
import MessageView from "./message/MessageView.vue";
</script>
