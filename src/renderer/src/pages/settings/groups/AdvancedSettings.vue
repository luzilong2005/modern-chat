<template>
    <SettingsGroup :title="t('pages.settings.advanced.title')">
        <SettingsGroupItem :title="t('pages.settings.advanced.tray')">
            <NCheckbox
                :label="t('pages.settings.advanced.enableTray')"
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
        <NDivider />
        <SettingsGroupItem :title="t('pages.settings.advanced.aiModel')">
            <span class="space-y-6">
                <div class="flex items-center justify-between space-x-2.5">
                    <NInput
                        clearable
                        :placeholder="t('pages.settings.advanced.search')"
                    >
                        <template #prefix>
                            <SearchIcon class="size-5" />
                        </template>
                    </NInput>
                    <NButton @click="handleAddModel">{{ t("pages.settings.advanced.button.add") }}</NButton>
                </div>
                <NEmpty v-if="settings.aiModels.length < 1">
                    <p>添加一个模型吧</p>
                </NEmpty>
                <NScrollbar
                    v-else
                    style="max-height: 200px"
                >
                    <div class="px-4">
                        <template v-for="item in settings.aiModels">
                            <div
                                class="border-mc-border flex items-center justify-between space-y-2.5 rounded-lg border"
                            >
                                <p class="text-mc-text-primary truncate select-none">
                                    {{ `${item.displayName} - ${item.model}` }}
                                </p>
                                <div class="flex gap-x-2.5">
                                    <NButton
                                        size="small"
                                        type="success"
                                        ghost
                                        @click="handleEditModel(item.id)"
                                        >{{ t("pages.settings.advanced.button.edit") }}</NButton
                                    >
                                    <NButton
                                        size="small"
                                        type="error"
                                        ghost
                                        @click="handleDeleteModel(item.id)"
                                        >{{ t("pages.settings.advanced.button.delete") }}</NButton
                                    >
                                </div>
                            </div>
                        </template>
                    </div>
                </NScrollbar>
            </span>
        </SettingsGroupItem>
    </SettingsGroup>
</template>

<script setup lang="ts">
import { ipc } from "@renderer/apis";
import SettingsGroup from "../SettingsGroup.vue";
import SettingsGroupItem from "../SettingsGroupItem.vue";
import { I18nMessageSchema } from "@renderer/i18n";
import { useSettingsStore } from "@renderer/stores";
import { NCheckbox, NButton, NButtonGroup, NDivider, NInput, NScrollbar, NEmpty } from "naive-ui";
import { toValue } from "vue";
import { useI18n } from "vue-i18n";
import { SearchIcon } from "lucide-vue-next";

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

const handleAddModel = () => {
    ipc.invoke("dialog:create", {
        name: "addModel",
        route: "/add-model",
        width: 400,
        height: 380,
    });
};

const handleEditModel = (id: string) => {
    ipc.invoke("dialog:create", {
        name: "editModel",
        route: `/edit-model?id=${id}`,
        width: 400,
        height: 380,
    });
};

const handleDeleteModel = (id: string) => {
    ipc.invoke("dialog:message", {
        type: "warning",
        title: t("pages.settings.advanced.dialog.delete-model.title"),
        message: t("pages.settings.advanced.dialog.delete-model.content"),
        buttons: [
            t("pages.settings.advanced.dialog.delete-model.button.ok"),
            t("pages.settings.advanced.dialog.delete-model.button.cancel"),
        ],
    }).then(({ response }) => {
        if (response === 0) settings.aiModels.splice(settings.aiModels.findIndex((item) => item.id === id));
    });
};
</script>
