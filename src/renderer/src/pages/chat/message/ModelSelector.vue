<template>
    <span class="w-[200px]">
        <NSelect
            v-model:value="currentModel"
            :options="options"
            :placeholder="t('pages.chat.selectModel')"
            :disabled="!currentModel"
        >
            <template></template>
        </NSelect>
    </span>
</template>

<script setup lang="ts">
import { I18nMessageSchema } from "@renderer/i18n";
import { useSettingsStore } from "@renderer/stores";
import { NSelect } from "naive-ui";
import { computed, shallowRef } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n<{ message: I18nMessageSchema }>();
const settings = useSettingsStore();
const options = computed(() => {
    return settings.modelConfigs.map(({ model }) => ({ label: model, value: model }));
});
const currentModel = shallowRef(settings.modelConfigs.at(0)?.model ?? null);
</script>
