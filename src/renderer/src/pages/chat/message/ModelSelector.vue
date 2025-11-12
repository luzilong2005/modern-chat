<template>
    <span class="w-[200px]">
        <NSelect
            v-model:value="currentModel"
            :options="options"
            placeholder="选择模型"
        >
            <template></template>
        </NSelect>
    </span>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@renderer/stores";
import { NSelect } from "naive-ui";
import { computed, shallowRef } from "vue";

const settings = useSettingsStore();
const options = computed(() => {
    return settings.aiModels.map(({ displayName, model }) => ({ label: displayName, value: model }));
});
const currentModel = shallowRef(settings.aiModels.at(0)?.model);
</script>
