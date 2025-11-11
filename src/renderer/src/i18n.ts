import { createI18n } from "vue-i18n";

const zhCN = await import("@locales/zh-CN.json").then((module) => module.default);
const enUS = await import("@locales/en-US.json").then((module) => module.default);

const createI18nInstance = async () => {
    const i18n = createI18n<[I18nMessageSchema], "zh-CN" | "en-US">({
        locale: "zh-CN",
        fallbackLocale: "zh-CN",
        legacy: false,
        messages: {
            [`zh-CN`]: zhCN,
            [`en-US`]: enUS,
        },
    });
    return i18n;
};
export const i18n = await createI18nInstance();
export type I18nMessageSchema = typeof zhCN;
