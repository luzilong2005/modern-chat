<template>
    <div class="flex w-full flex-col">
        <AppTitleBar :title="t('pages.history.title')" />
        <main class="flex flex-col">
            <div class="h-20">
                <NInput
                    size="large"
                    :placeholder="t('pages.history.search')"
                >
                    <template #prefix>
                        <SearchIcon />
                    </template>
                </NInput>
            </div>
            <NScrollbar style="max-height: calc(100vh - 40px - 80px)">
                <div>
                    <HistoryMessageBox v-for="_ in 100" />
                </div>
            </NScrollbar>
        </main>
    </div>
</template>

<script setup lang="ts">
import { AppTitleBar } from "@renderer/components/AppTitleBar";
import { I18nMessageSchema } from "@renderer/i18n";
import { SearchIcon } from "lucide-vue-next";
import { NInput, NScrollbar } from "naive-ui";
import { useI18n } from "vue-i18n";
import HistoryMessageBox from "./HistoryMessageBox.vue";
const { t } = useI18n<{ message: I18nMessageSchema }>();
</script>
