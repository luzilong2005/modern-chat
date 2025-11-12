<template>
    <div class="flex h-full flex-col">
        <div class="flex h-35 flex-col items-center justify-center space-y-3 px-3">
            <NInput :placeholder="t('pages.chat.search')">
                <template #suffix>
                    <SearchIcon class="text-mc-text-secondary size-5" />
                </template>
            </NInput>
            <NButton block>
                <template #icon>
                    <MessageSquarePlus class="size-5" />
                </template>
                {{ t("pages.chat.addNewConversation") }}
            </NButton>
        </div>
        <NScrollbar>
            <div class="px-3">
                <ConversationBox
                    v-for="item in mockConversations"
                    :data="item"
                    :key="item.id"
                />
            </div>
        </NScrollbar>
    </div>
</template>

<script setup lang="ts">
import { MessageSquarePlus, SearchIcon } from "lucide-vue-next";
import { NInput, NScrollbar, NButton } from "naive-ui";
import ConversationBox from "./ConversationBox.vue";
import { useI18n } from "vue-i18n";
import { I18nMessageSchema } from "@renderer/i18n";
import { mockConversations } from "@renderer/mock";

const { t } = useI18n<{ message: I18nMessageSchema }>();
</script>
