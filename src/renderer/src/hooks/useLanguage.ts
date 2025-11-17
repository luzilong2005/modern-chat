import { type I18nMessageSchema } from "@renderer/i18n";
import { useI18n } from "vue-i18n";
export const useLanguage = () => {
    const i18n = useI18n<{ message: I18nMessageSchema }>();

    const setLanguage = (locale: string) => {
        i18n.locale.value = locale as any;
    };

    return {
        setLanguage,
        t: i18n.t,
    };
};
