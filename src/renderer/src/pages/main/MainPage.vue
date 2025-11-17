<template>
    <div class="bg-mc-background flex h-screen w-screen">
        <AppSidebar />
        <div class="h-screen w-[calc(100vw-60px)]">
            <ElSplitter>
                <ElSplitterPanel
                    max="40%"
                    min="300px"
                    size="320px"
                >
                    <ConversationView />
                </ElSplitterPanel>
                <ElSplitterPanel>
                    <RouterView />
                </ElSplitterPanel>
            </ElSplitter>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppSidebar from "@renderer/components/AppSidebar";
import ConversationView from "./conversation/ConversationView.vue";
import { ElSplitter, ElSplitterPanel } from "element-plus";
</script>
