import { LOG_ERROR } from "@renderer/apis/log";
import { type App } from "vue";
export const setupVueGlobalErrorHandler = (app: App) => {
    app.config.errorHandler = (error, _vm, info) => {
        LOG_ERROR(error, info);
    };
};

export const setupWindowGlobalErrorHandler = () => {
    window.addEventListener("error", (event) => {
        LOG_ERROR(event.error, event.message);
    });
    window.addEventListener("unhandledrejection", (event) => {
        LOG_ERROR(event.reason);
    });
};
