<template></template>

<script setup lang="ts">
import { useLanguage } from "@renderer/hooks/useLanguage";
import { useSettingsStore } from "@renderer/stores";
import { watchEffect } from "vue";

const settings = useSettingsStore();
const { setLanguage } = useLanguage();
watchEffect(() => {
    setLanguage(settings.language);
});
</script>
