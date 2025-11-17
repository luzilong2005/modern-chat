<template>
    <div class="bg-mc-background h-screen w-screen">
        <AppTitleBar
            :minimizable="false"
            :maximizable="false"
            :title="t('pages.dialog.model.add')"
        />
        <ElForm
            class="px-5"
            ref="form"
            :rules="rules"
            :model="data"
            label-position="top"
        >
            <ElFormItem :label="t('pages.dialog.model.form.model')">
                <ElInput v-model:model-value="data.model" />
            </ElFormItem>
            <ElFormItem :label="t('pages.dialog.model.form.baseURL')">
                <ElInput v-model:model-value="data.baseURL" />
            </ElFormItem>
            <ElFormItem :label="t('pages.dialog.model.form.apiKey')">
                <ElInput v-model:model-value="data.apiKey" show-password/>
            </ElFormItem>
            <div class="flex justify-end">
                <ElButton
                    type="primary"
                    @click="handleSubmit"
                    >{{ t("pages.dialog.model.buttons.ok") }}</ElButton
                >
                <ElButton
                    type="danger"
                    @click="handleCancel"
                    >{{ t("pages.dialog.model.buttons.cancel") }}</ElButton
                >
            </div>
        </ElForm>
    </div>
</template>

<script setup lang="ts">
import { ipc } from "@renderer/apis/ipc";
import { AppTitleBar } from "@renderer/components/AppTitleBar";
import { useLanguage } from "@renderer/hooks/useLanguage";
import { AIModelConfig } from "@shared";
import { ElButton, ElForm, ElFormItem, ElInput, type FormInstance, FormRules } from "element-plus";
import { reactive, ref, toRaw } from "vue";

const { t } = useLanguage();
const form = ref<FormInstance | null>(null);
const data = reactive<AIModelConfig>({ apiKey: "", baseURL: "", model: "" });
const rules = reactive<FormRules<AIModelConfig>>({
    apiKey: { required: true },
    baseURL: { required: true },
    model: { required: true },
});

const handleSubmit = async () => {
    const valid = await form.value?.validate();
    if (!valid) return;
    ipc.invoke("dialog:close", "add-model-dialog", toRaw(data));
};
const handleCancel = () => {
    ipc.invoke("dialog:close", "add-model-dialog", null);
};
</script>
