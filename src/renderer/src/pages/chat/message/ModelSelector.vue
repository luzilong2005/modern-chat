<template>
    <span class="w-[100px]">
        <NSelect
            :options="options"
            placeholder="选择模型"
        >
            <template></template>
        </NSelect>
    </span>
</template>

<script setup lang="ts">
import { NSelect } from "naive-ui";
import { reactive } from "vue";

const options = reactive([
    { label: "模型1", value: "model1" },
    { label: "模型2", value: "model2" },
]);
</script>
