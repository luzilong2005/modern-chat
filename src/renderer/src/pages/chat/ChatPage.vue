<template>
    <div class="flex h-screen flex-col">
        <AppTitleBar :title="title"/>
        <MessageView />
    </div>
</template>

<script setup lang="ts">
import { AppTitleBar } from "@renderer/components/AppTitleBar";
import MessageView from "./message/MessageView.vue";
import { useRouteQuery } from "@vueuse/router";

const title = useRouteQuery("title", "", { transform: String });
</script>
