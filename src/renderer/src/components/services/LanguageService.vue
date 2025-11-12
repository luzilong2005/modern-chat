<template></template>
<script setup lang="ts">
import { useSettingsStore } from "@renderer/stores";
import { watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const settings = useSettingsStore();
const { locale } = useI18n();

watchEffect(() => {
    locale.value = settings.language;
});
</script>
