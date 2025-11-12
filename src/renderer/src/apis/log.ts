import { ipc } from "./ipc";

export const LOG_INFO = (...messages: any[]) => ipc.invoke("log:info", ...messages);
export const LOG_WARN = (...messages: any[]) => ipc.invoke("log:warn", ...messages);
export const LOG_ERROR = (...messages: any[]) => ipc.invoke("log:error", ...messages);
export const LOG_DEBUG = (...messages: any[]) => ipc.invoke("log:debug", ...messages);