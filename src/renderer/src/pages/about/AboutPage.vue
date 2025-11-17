<template>
    <div class="bg-mc-background app-draggable flex h-screen w-screen flex-col">
        <AppTitleBar :maximizable="false" />
        <div class="flex flex-auto flex-col items-center justify-center px-6">
            <h1
                class="app-no-draggable mb-10 bg-linear-to-r from-emerald-400 to-green-600 bg-clip-text text-4xl font-extrabold text-transparent"
            >
                Modern Chat
            </h1>
            <ul class="w-full max-w-lg rounded-2xl p-3">
                <li
                    class="border-mc-border hover:bg-mc-hover flex items-center justify-between border-b transition last:border-b-0"
                    v-for="(version, name) in versions"
                    :key="name"
                >
                    <p class="text-mc-text-primary font-medium">{{ name }}</p>
                    <p class="text-mc-text-secondary text-sm">{{ version }}</p>
                </li>
            </ul>
            <div class="flex items-center">
                <IconButton
                    class="rounded-full"
                    :tooltip="t('pages.about.github')"
                    @click="handleOpenGithubSite"
                >
                    <GithubIcon />
                </IconButton>
                <IconButton
                    class="rounded-full"
                    :tooltip="t('pages.about.docs')"
                    @click="handleOpenDocsSite"
                >
                    <BookIcon />
                </IconButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconButton } from "@renderer/components/IconButton";
import { AppTitleBar } from "@renderer/components/AppTitleBar";
import { DOCS_SITE_URL, GITHUB_URL } from "@renderer/constants";
import { GithubIcon, BookIcon } from "lucide-vue-next";
import { onMounted, reactive } from "vue";
import { ipc } from "@renderer/apis/ipc";
import { useLanguage } from "@renderer/hooks/useLanguage";

const { t } = useLanguage();
const versions = reactive<Partial<Record<"node" | "electron" | "arch" | "chromium" | "platform", string>>>({});

const handleOpenGithubSite = () => {
    ipc.invoke("app:open-external", GITHUB_URL);
};
const handleOpenDocsSite = () => {
    ipc.invoke("app:open-external", DOCS_SITE_URL);
};

onMounted(async () => {
    versions.node = await ipc.invoke("version:node");
    versions.electron = await ipc.invoke("version:electron");
    versions.arch = await ipc.invoke("version:arch");
    versions.chromium = await ipc.invoke("version:chromium");
    versions.platform = await ipc.invoke("version:platform");
});
</script>
