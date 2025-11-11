<template>
    <header class="app-draggable flex h-10 w-full shrink-0 items-center px-2">
        <div v-if="!!props.title">
            <p class="text-mc-text-primary font-semibold">{{ props.title }}</p>
        </div>
        <div class="ml-auto flex justify-end space-x-1.5">
            <AppTitleBarButton
                v-if="props.minimizable"
                :icon="MinusIcon"
                :tooltip="t('ui.titlebar.minimize')"
                @click="handleMinimize"
            />
            <AppTitleBarButton
                v-if="props.maximizable"
                :icon="maximized ? MinimizeIcon : MaximizeIcon"
                :tooltip="maximized ? t('ui.titlebar.unmaximize') : t('ui.titlebar.maximize')"
                @click="handleMaximize"
            />
            <AppTitleBarButton
                class="hover:bg-red-400"
                v-if="props.closable"
                :icon="XIcon"
                :tooltip="t('ui.titlebar.close')"
                @click="handleClose"
            />
        </div>
    </header>
</template>

<script setup lang="ts">
import { MaximizeIcon, MinimizeIcon, MinusIcon, XIcon } from "lucide-vue-next";
import { ipc } from "@renderer/apis";
import AppTitleBarButton from "./AppTitleBarButton.vue";
import { shallowRef } from "vue";
import { useI18n } from "vue-i18n";
import { I18nMessageSchema } from "@renderer/i18n";

interface Props {
    closable?: boolean;
    minimizable?: boolean;
    maximizable?: boolean;
    title?: string;
}

const props = withDefaults(defineProps<Props>(), {
    closable: true,
    minimizable: true,
    maximizable: true,
});

const { t } = useI18n<{ message: I18nMessageSchema }>();
const maximized = shallowRef(false);

const handleClose = () => {
    ipc.invoke("window:close");
};
const handleMinimize = () => {
    ipc.invoke("window:minimize");
};
const handleMaximize = async () => {
    if (await ipc.invoke("window:is-maximized")) {
        maximized.value = false;
        return ipc.invoke("window:unmaximize");
    }
    maximized.value = true;
    ipc.invoke("window:maximize");
};
</script>
