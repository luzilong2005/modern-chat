<template>
    <div class="h-hull flex flex-col w-full">
        <AppTitleBar />
        <NScrollbar style="height: calc(100vh - 240px - 40px)">
            <div class="p-4">
                <p v-for="_ in 100">hello</p>
            </div>
        </NScrollbar>
        <MessageEditor />
    </div>
</template>

<script setup lang="ts">
import { AppTitleBar } from "@renderer/components/AppTitleBar";
import { NScrollbar } from "naive-ui";
import MessageEditor from "./MessageEditor.vue";
</script>
