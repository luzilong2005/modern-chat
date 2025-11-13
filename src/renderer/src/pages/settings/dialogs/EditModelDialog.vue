<template>
    <div>
        <AppTitleBar
            :minimizable="false"
            :maximizable="false"
            :title="t('pages.settings.advanced.dialog.edit-model.title')"
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
                    :label="t('pages.settings.advanced.dialog.edit-model.form.model')"
                    path="model"
                >
                    <NInput
                        v-model:value="data.model"
                        placeholder=""
                    ></NInput>
                </NFormItem>
                <NFormItem
                    :label="t('pages.settings.advanced.dialog.edit-model.form.baseURL')"
                    path="baseURL"
                >
                    <NInput
                        v-model:value="data.baseURL"
                        placeholder=""
                    ></NInput>
                </NFormItem>
                <NFormItem
                    :label="t('pages.settings.advanced.dialog.edit-model.form.apiKey')"
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
                    {{ t("pages.settings.advanced.dialog.edit-model.button.ok") }}
                </NButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ipc } from "@renderer/apis";
import { AppTitleBar } from "@renderer/components/AppTitleBar";
import { I18nMessageSchema } from "@renderer/i18n";
import { useSettingsStore } from "@renderer/stores";
import { AIModelConfig } from "@shared";
import { FormInst, FormItemRule, NButton, NForm, NFormItem, NInput } from "naive-ui";
import { onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

interface FormData extends AIModelConfig {}

const { t } = useI18n<{ message: I18nMessageSchema }>();
const route = useRoute();
const settings = useSettingsStore();
const form = ref<FormInst | null>(null);
const data = reactive<FormData>({ model: "", baseURL: "", apiKey: "" });
const rules: Record<keyof FormData, FormItemRule[]> = {
    model: [{ required: true, message: "必填" }],
    baseURL: [{ required: true, message: "必填" }],
    apiKey: [{ required: true, message: "必填" }],
};

const handleSubmit = () => {
    form.value?.validate((errors) => {
        if (errors) {
            return;
        }
        settings.modelConfigs.push({ ...data });
        ipc.invoke("window:close");
    });
};

onMounted(() => {
    const config = settings.modelConfigs.find((item) => item.model === route.query.model);
    if (config) {
        data.model = config.model;
        data.baseURL = config.baseURL;
        data.apiKey = config.apiKey;
    } else {
        ipc.invoke("window:close");
    }
});
</script>
