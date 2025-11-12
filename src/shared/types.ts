import { TRAY_CONTEXTMENU_CODE, CONTEXTMENU_CODE, WINDOW_NAME } from "./enums";
import electron from "electron";
export type IpcEvents = {
    "app:quit": () => void;
    "app:relaunch": () => void;
    "app:open-path": (path: string) => string;
    "app:open-external": (url: string) => void;

    "clipboard:write": (...args: Parameters<electron.Clipboard["write"]>) => void;
    "clipboard:write-text": (content: string) => void;

    "log:info": (messages: string) => void;
    "log:error": (messages: string) => void;
    "log:warn": (messages: string) => void;
    "log:debug": (messages: string) => void;
    "log:get-dir": () => string;
    "log:cleanup": () => void;

    "version:node": () => string;
    "version:electron": () => string;
    "version:chromium": () => string;
    "version:platform": () => string;
    "version:arch": () => string;

    "window:maximize": () => void;
    "window:minimize": () => void;
    "window:unmaximize": () => void;
    "window:is-maximized": () => boolean;
    "window:is-minimized": () => boolean;
    "window:is-maximizable": () => boolean;
    "window:is-minimizable": () => boolean;
    "window:close": () => void;
    "window:open": (name: WINDOW_NAME, route: `/${string}`) => void;

    "tray:open": (template: Array<{ code: TRAY_CONTEXTMENU_CODE; label: string }>) => void;
    "tray:close": () => void;

    "contextmenu:open": (template: Array<{ code: CONTEXTMENU_CODE; label: string }>) => CONTEXTMENU_CODE | null;

    "dialog:message": (options: electron.MessageBoxOptions) => electron.MessageBoxReturnValue;
    "dialog:error": (title: string, content: string) => void;
    "dialog:openable": (options: electron.OpenDialogOptions) => electron.OpenDialogReturnValue;
    "dialog:saveable": (options: electron.SaveDialogOptions) => electron.SaveDialogReturnValue;

    "file:read-file": (path: string) => string;
    "file:write-file": (path: string, content: string) => void;
};

export type IpcRendererEvents = {
    "tray:clicked": [code: TRAY_CONTEXTMENU_CODE];
};

export interface AIModelConfig {
    id: number;
    name: string;
    modelCode: string;
    baseURL: string;
    apiKey: string;
}

export interface ConversationData {
    id: string;
    title: string;
    createdDate: Date;
    updatedDate: Date;
}

export interface MessageData {
    conversationId: string;
    id: string;
    content: string;
    createdDate: Date;
    updatedDate: Date;
    sender: "user" | "bot";
}

export interface UserMessageData extends MessageData {}

export interface BotMessageData extends MessageData {
    modelName: string;
}
