<template>
    <div class="flex h-screen w-full flex-col">
        <AppTitleBar :title="t('pages.history.title')" />
        <main class="flex h-[calc(100%-40px)] flex-col">
            <div class="h-20 px-4">
                <ElInput
                    v-model:model-value="searchValue"
                    size="large"
                    :placeholder="t('pages.history.search')"
                >
                    <template #prefix>
                        <SearchIcon />
                    </template>
                </ElInput>
            </div>
            <ElScrollbar style="max-height: calc(100vh - 40px - 80px)">
                <div class="space-y-5 px-4">
                    <HistoryMessageBox
                        v-for="data in searchResult"
                        :data
                        :key="data.id.toString()"
                        @deleted="(id) => remove(conversations, (item) => item.id === id)"
                    />
                </div>
            </ElScrollbar>
        </main>
    </div>
</template>

<script setup lang="ts">
import { AppTitleBar } from "@renderer/components/AppTitleBar";
import { SearchIcon } from "lucide-vue-next";
import { ElInput, ElScrollbar } from "element-plus";
import HistoryMessageBox from "./HistoryMessageBox.vue";
import { useLanguage } from "@renderer/hooks/useLanguage";
import { computed, onMounted, reactive, shallowRef } from "vue";
import { search } from "fast-fuzzy";
import { ConversationData } from "@shared";
import { ipc } from "@renderer/apis/ipc";
import { remove } from "es-toolkit";
const { t } = useLanguage();

const conversations = reactive(new Array<ConversationData>());
const searchValue = shallowRef("");
const searchResult = computed(() =>
    searchValue.value.trim() === "" ? conversations : search(searchValue.value, conversations, { keySelector: (s) => s.title }),
);

onMounted(async () => {
    conversations.splice(0, conversations.length, ...(await ipc.invoke("db:get-conversations")));
});
</script>
