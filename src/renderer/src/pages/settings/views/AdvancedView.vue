<template>
    <SettingsGroup>
        <SettingsGroupItem>
            <ElButton @click="handleImportSettings">{{ t("pages.settings.advanced.importSetting") }}</ElButton>
        </SettingsGroupItem>
        <SettingsGroupItem>
            <ElButton @click="handleExportSettings">{{ t("pages.settings.advanced.exportSetting") }}</ElButton>
        </SettingsGroupItem>
        <SettingsGroupItem :title="t('pages.settings.advanced.enableTray')">
            <ElCheckbox v-model:model-value="settings.enableTray" />
        </SettingsGroupItem>
        <SettingsGroupItem>
            <ElButton @click="handleOpenLogDir">{{ t("pages.settings.advanced.openLogDir") }}</ElButton>
        </SettingsGroupItem>
        <SettingsGroupItem>
            <ElButton @click="handleCleanupLogs">{{ t("pages.settings.advanced.cleanupLogs") }}</ElButton>
        </SettingsGroupItem>
    </SettingsGroup>
    <ElDivider />
    <SettingsGroup>
        <div>
            <div class="flex items-center space-x-2.5">
                <ElInput v-model:model-value="modelSearch">
                    <template #prefix>
                        <SearchIcon class="size-4.5" />
                    </template>
                </ElInput>
                <ElButton
                    class="w-8"
                    @click="handleOpenAddModelDialog"
                >
                    <template #icon>
                        <PlusIcon />
                    </template>
                </ElButton>
            </div>
            <ElScrollbar max-height="400">
                <template v-for="(item, id) in finalModels">
                    <div class="flex items-center justify-between">
                        <p class="text-mc-text-primary truncate text-sm">{{ item.model }}</p>
                        <div class="flex items-center">
                            <ElButton
                                text
                                @click="handleOpenEditModelDialog(id)"
                            >
                                <template #icon>
                                    <EditIcon />
                                </template>
                            </ElButton>
                            <ElButton
                                type="danger"
                                text
                                @click="handleOpenDeleteModelDialog(id)"
                            >
                                <template #icon>
                                    <Trash2Icon />
                                </template>
                            </ElButton>
                        </div>
                    </div>
                </template>
            </ElScrollbar>
        </div>
    </SettingsGroup>
</template>

<script setup lang="ts">
import { ElButton, ElCheckbox, ElDivider, ElInput, ElScrollbar } from "element-plus";
import SettingsGroup from "../SettingsGroup.vue";
import SettingsGroupItem from "../SettingsGroupItem.vue";
import { useLanguage } from "@renderer/hooks/useLanguage";
import { useSettingsStore } from "@renderer/stores";
import { ipc } from "@renderer/apis/ipc";
import { EditIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-vue-next";
import { LOG_ERROR } from "@renderer/apis/log";
import { computed, shallowRef } from "vue";
import { search } from "fast-fuzzy";
const { t } = useLanguage();
const settings = useSettingsStore();
const modelSearch = shallowRef("");
const finalModels = computed(() =>
    modelSearch.value.trim() === ""
        ? settings.modelConfigs
        : search(modelSearch.value, settings.modelConfigs, { keySelector: (item) => item.model }),
);
const handleOpenLogDir = async () => {
    ipc.invoke("app:open-path", await ipc.invoke("log:get-dir"));
};

const handleCleanupLogs = async () => {
    await ipc.invoke("log:cleanup");
};

const handleImportSettings = async () => {
    const { filePaths } = await ipc.invoke("dialog:openable", {
        title: "import",
        filters: [{ name: "JSON", extensions: ["json"] }],
        properties: ["openFile"],
    });
    const json = await ipc.invoke("file:read-file", filePaths[0]);
    try {
        settings.$patch(JSON.parse(json));
    } catch (error) {
        LOG_ERROR("[Renderer ipc]", error);
    }
};

const handleExportSettings = async () => {
    const { filePath } = await ipc.invoke("dialog:saveable", {
        title: "export",
        filters: [{ name: "JSON", extensions: ["json"] }],
        defaultPath: "settings.json",
    });
    ipc.invoke("file:write-file", filePath, JSON.stringify(settings.$state));
};

const handleOpenAddModelDialog = () => {
    ipc.invoke("dialog:create", {
        name: "add-model-dialog",
        width: 380,
        height: 380,
        minimizable: false,
        maximizable: false,
        resizable: false,
        route: "/dialog/add-model",
    });
    ipc.once("dialog:closed", (_, name, data) => {
        if (name === "add-model-dialog") {
            settings.modelConfigs.push(data as any);
        }
    });
};

const handleOpenEditModelDialog = (id: number) => {
    ipc.invoke("dialog:create", {
        name: "edit-model-edit",
        width: 380,
        height: 380,
        minimizable: false,
        maximizable: false,
        resizable: false,
        route: `/dialog/edit-model/${id}`,
    });
};

const handleOpenDeleteModelDialog = async (id: number) => {
    const { response } = await ipc.invoke("dialog:message", {
        title: "Delete",
        message: "Delete",
        type: "warning",
        buttons: ["cancel", "ok"],
        cancelId: 0,
    });
    if (response === 1) {
        settings.modelConfigs.splice(id, 1);
    }
};
</script>
