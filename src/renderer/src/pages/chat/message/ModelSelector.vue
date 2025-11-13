<template>
    <span class="w-[200px]">
        <NSelect
            v-model:value="currentModel"
            :options="options"
            :placeholder="t('pages.chat.selectModel')"
            :disabled="!currentModel"
            @update-value="handleChangeModel"
        >
            <template></template>
        </NSelect>
    </span>
</template>

<script setup lang="ts">
import { I18nMessageSchema } from "@renderer/i18n";
import { useGlobalsStore, useSettingsStore } from "@renderer/stores";
import { NSelect } from "naive-ui";
import { computed, shallowRef } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n<{ message: I18nMessageSchema }>();
const settings = useSettingsStore();
const globals = useGlobalsStore();
const options = computed(() => {
    return settings.modelConfigs.map(({ model }) => ({ label: model, value: model }));
});

const currentModel = shallowRef(globals.currentModel ?? settings.modelConfigs[0].model ?? null);

const handleChangeModel = (value: string) => {
    globals.currentModel = value;
};
</script>
