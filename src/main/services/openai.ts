import OpenAI from "openai";
import { BaseService } from "./BaseService";
import { ipc } from "../ipc";
import { windowService } from "./window";
import type { AIModelConfig } from "@shared";
import { databaseService } from "./database";
import { pick } from "es-toolkit";
import { LOG_INFO } from "./log";

class OpenAIService extends BaseService {
    protected setupIpcEvents() {
        ipc.handle("openai:send-message", (_, config, conversationId, content) => {
            return this.chat(config, conversationId, content);
        });
    }

    private mergeMessage(raw: string, chunk: OpenAI.ChatCompletionChunk) {
        if (chunk.choices[0].delta.content) {
            return raw.concat(chunk.choices[0].delta.content);
        }
        return raw;
    }

    private async chat(config: AIModelConfig, conservationId: bigint, message: string) {
        const fullMessage = "";
        const mainWindow = windowService.getMainWindow();
        const contextMessages = databaseService.getMessages(conservationId);
        const client = new OpenAI({ apiKey: config.apiKey, baseURL: config.baseURL });
        const stream = await client.chat.completions.create({
            model: config.model,
            messages: [...contextMessages.map((m) => pick(m, ["role", "content"])), { role: "user", content: message }],
            stream: true,
        });
        ipc.send(mainWindow.webContents, "openai:start-chat");
        for await (const chunk of stream) {
            ipc.send(mainWindow.webContents, "openai:chat-stream", chunk.choices[0].delta.content ?? null);
            this.mergeMessage(fullMessage, chunk);
        }
        ipc.send(mainWindow.webContents, "openai:chat-end", fullMessage);
        return fullMessage;
    }

    public constructor() {
        super();
    }

    public init() {
        super.init();
        LOG_INFO("[OpenAIService] Initialized");
    }
}

export const openaiService = OpenAIService.getInstance();
