<template>
    <div>
        <AppTitleBar
            :minimizable="false"
            :maximizable="false"
            :title="t('pages.settings.advanced.dialog.add-model.title')"
        />
        <div class="flex h-[calc(100vh-40px)] flex-col justify-between space-y-2.5 p-2.5">
            <NForm
                ref="form"
                :model="data"
                :rules="rules"
                label-placement="left"
                label-width="auto"
            >
                <NFormItem
                    :label="t('pages.settings.advanced.dialog.add-model.form.model')"
                    path="model"
                >
                    <NInput
                        v-model:value="data.model"
                        placeholder=""
                    ></NInput>
                </NFormItem>
                <NFormItem
                    :label="t('pages.settings.advanced.dialog.add-model.form.baseURL')"
                    path="baseURL"
                >
                    <NInput
                        v-model:value="data.baseURL"
                        placeholder=""
                    ></NInput>
                </NFormItem>
                <NFormItem
                    :label="t('pages.settings.advanced.dialog.add-model.form.apiKey')"
                    path="apiKey"
                >
                    <NInput
                        v-model:value="data.apiKey"
                        placeholder=""
                    ></NInput>
                </NFormItem>
            </NForm>
            <div class="flex items-center justify-end">
                <NButton
                    type="primary"
                    ghost
                    @click="handleSubmit"
                >
                    {{ t("pages.settings.advanced.dialog.add-model.button.ok") }}
                </NButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ipc } from "@renderer/apis";
import { AppTitleBar } from "@renderer/components/AppTitleBar";
import { useSettingsStore } from "@renderer/stores";
import { AIModelConfig } from "@shared";
import { FormInst, FormItemRule, NButton, NForm, NFormItem, NInput } from "naive-ui";
import { reactive, ref, toRaw } from "vue";
import { useI18n } from "vue-i18n";
import { I18nMessageSchema } from "@renderer/i18n";
interface FormData extends AIModelConfig {}

const { t } = useI18n<{ message: I18nMessageSchema }>();
const settings = useSettingsStore();
const form = ref<FormInst | null>(null);
const data = reactive<FormData>({ model: "", baseURL: "", apiKey: "" });
const rules: Record<keyof FormData, FormItemRule[]> = {
    model: [{ required: true, message: t("pages.settings.advanced.dialog.add-model.form.required") }],
    baseURL: [{ required: true, message: t("pages.settings.advanced.dialog.add-model.form.required") }],
    apiKey: [{ required: true, message: t("pages.settings.advanced.dialog.add-model.form.required") }],
};

const handleSubmit = () => {
    try {
        form.value?.validate((errors) => {
            if (errors) {
                return;
            }
            if (settings.modelConfigs.some((item) => item.model === data.model)) {
                ipc.invoke("dialog:error", "error", "已有该模型");
                return;
            }
            ipc.invoke("dialog:close", { name: "add-model-dialog", data: toRaw(data) });
        });
    } catch (error) {}
};
</script>
