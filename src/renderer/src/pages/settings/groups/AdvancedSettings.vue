<template>
    <SettingsGroup title="高级">
        <SettingsGroupItem title="托盘">
            <NCheckbox
                label="启动托盘"
                size="large"
                :checked="settings.trayEnabled"
                @update-checked="(v) => settings.$patch({ trayEnabled: v })"
            />
        </SettingsGroupItem>
        <NDivider />
        <SettingsGroupItem :title="t('pages.settings.advanced.configuration')">
            <NButtonGroup>
                <NButton @click="handleExportSettings">{{ t("pages.settings.advanced.exportSettings") }}</NButton>
                <NButton @click="handleImportSettings">{{ t("pages.settings.advanced.importSettings") }}</NButton>
            </NButtonGroup>
        </SettingsGroupItem>
        <NDivider />
        <SettingsGroupItem :title="t('pages.settings.advanced.log')">
            <NButtonGroup>
                <NButton @click="handleOpenLogDir">{{ t("pages.settings.advanced.openLogDir") }}</NButton>
                <NButton @click="handleCleanupLogs">{{ t("pages.settings.advanced.cleanupLogs") }}</NButton>
            </NButtonGroup>
        </SettingsGroupItem>
    </SettingsGroup>
</template>

<script setup lang="ts">
import { ipc } from "@renderer/apis";
import SettingsGroup from "../SettingsGroup.vue";
import SettingsGroupItem from "../SettingsGroupItem.vue";
import { I18nMessageSchema } from "@renderer/i18n";
import { useSettingsStore } from "@renderer/stores";
import { NCheckbox, NButton, NButtonGroup, NDivider } from "naive-ui";
import { toValue } from "vue";
import { useI18n } from "vue-i18n";

const settings = useSettingsStore();
const { t } = useI18n<{ message: I18nMessageSchema }>();

const settingsToJSON = () => {
    return JSON.stringify(toValue(settings.$state), null, 4);
};

const settingsFromJSON = (json: string) => {
    try {
        const settingsObj = JSON.parse(json);
        settings.$patch(settingsObj);
    } catch (error) {
        ipc.invoke("log:error", String(error as Error));
    }
};

const handleExportSettings = async () => {
    const { filePath } = await ipc.invoke("dialog:saveable", {
        title: t("pages.settings.advanced.exportSettings"),
        defaultPath: "settings.json",
        filters: [{ name: "JSON", extensions: ["json"] }],
    });
    ipc.invoke("file:write-file", filePath, settingsToJSON());
};

const handleImportSettings = async () => {
    const { filePaths } = await ipc.invoke("dialog:openable", {
        title: t("pages.settings.advanced.importSettings"),
        filters: [{ name: "JSON", extensions: ["json"] }],
        properties: ["openFile"],
    });
    const json = await ipc.invoke("file:read-file", filePaths[0]);
    settingsFromJSON(json);
};

const handleOpenLogDir = async () => {
    ipc.invoke("app:open-path", await ipc.invoke("log:get-dir"));
};

const handleCleanupLogs = () => {
    ipc.invoke("log:cleanup");
};
</script>
