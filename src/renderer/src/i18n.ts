import { createI18n } from "vue-i18n";
import zhCN from "@locales/zh-CN.json";
import enUS from "@locales/en-US.json";

export type I18nMessageSchema = typeof zhCN;
export const defaultLanguage = "zh-CN";
export const i18n = createI18n<[I18nMessageSchema], "zh-CN" | "en-US">({
    locale: defaultLanguage,
    fallbackLocale: "en-US",
    legacy: false,
    messages: {
        "zh-CN": zhCN,
        "en-US": enUS,
    },
});
