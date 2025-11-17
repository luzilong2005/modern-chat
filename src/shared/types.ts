import { TRAY_CONTEXTMENU_CODE, CONTEXTMENU_CODE, WINDOW_NAME, THEME_MODE, CHAT_STATE } from "./enums";
import electron from "electron";

export interface AIModelConfig {
    model: string;
    baseURL: string;
    apiKey: string;
}

export interface ConversationData {
    id: bigint;
    title: string;
    createdDate: Date;
    updatedDate: Date;
}

export interface MessageData {
    id: bigint;
    conversationId: bigint;
    role: "user" | "assistant";
    model: string;
    content: string;
    createdDate: Date;
    updatedDate: Date;
}

export type MessageChunk = string;

export type IpcEvents = {
    "app:quit": () => void;
    "app:relaunch": () => void;
    "app:open-path": (path: string) => string;
    "app:open-external": (url: string) => void;

    "clipboard:write": (...args: Parameters<electron.Clipboard["write"]>) => void;
    "clipboard:write-text": (...args: Parameters<electron.Clipboard["writeText"]>) => void;

    "log:info": (...messages: string[]) => void;
    "log:error": (...messages: string[]) => void;
    "log:warn": (...messages: string[]) => void;
    "log:debug": (...messages: string[]) => void;
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
    "window:open": (
        name: WINDOW_NAME,
        route: `/${string}`,
        options?: Pick<
            electron.BrowserWindowConstructorOptions,
            "height" | "width" | "closable" | "minimizable" | "maximizable" | "resizable"
        >,
    ) => void;
    "window:set-closable": (enabled: boolean) => void;
    "window:set-maximizable": (enabled: boolean) => void;
    "window:set-minimizable": (enabled: boolean) => void;

    "tray:open": (templates: Array<{ code: TRAY_CONTEXTMENU_CODE; label: string }>) => void;
    "tray:close": () => void;

    "contextmenu:open": (templates: Array<{ code: CONTEXTMENU_CODE; label: string }>) => CONTEXTMENU_CODE | null;

    "theme:set-mode": (mode: THEME_MODE) => void;
    "theme:get-mode": () => THEME_MODE;

    "dialog:message": (options: electron.MessageBoxOptions) => electron.MessageBoxReturnValue;
    "dialog:error": (title: string, content: string) => void;
    "dialog:openable": (options: electron.OpenDialogOptions) => electron.OpenDialogReturnValue;
    "dialog:saveable": (options: electron.SaveDialogOptions) => electron.SaveDialogReturnValue;
    "dialog:create": (
        options: { name: string; route: `/${string}` } & Pick<
            electron.BrowserWindowConstructorOptions,
            "width" | "height" | "closable" | "minimizable" | "maximizable" | "resizable"
        >,
    ) => unknown;
    "dialog:close": (name: string, data: unknown) => void;

    "file:read-file": (path: string) => string;
    "file:write-file": (path: string, content: string) => void;

    "openai:send-message": (config: AIModelConfig, conversationId: bigint, message: string) => string;
    "openai:set-state": (state: CHAT_STATE) => void;

    "db:get-conversations": () => ConversationData[];
    "db:add-conversation": (data: { title: string }) => ConversationData;
    "db:delete-conversation": (id: bigint) => void;
    "db:get-messages": (conversationId: bigint) => MessageData[];
    "db:add-message": (conversationId: bigint, role: "user" | "assistant", content: string) => MessageData;
};

export type IpcRendererEvents = {
    "tray:clicked": [code: TRAY_CONTEXTMENU_CODE];
    "dialog:closed": [name: string, data: unknown];
    "openai:chat": [chunk: MessageChunk | null, state: CHAT_STATE];
    "openai:start-chat": [];
    "openai:chat-stream": [chunk: MessageChunk | null];
    "openai:chat-end": [finalMessage: string];
};
