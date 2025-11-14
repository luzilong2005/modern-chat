import OpenAI from "openai";
import { BaseService } from "./BaseService";
import { ipc } from "./ipc";
import { windowService } from "./window";

class OpenAIService extends BaseService {
    private static instance: OpenAIService | null = null;
    private client: OpenAI | null = null;
    private constructor() {
        super();
    }

    private setupIpcEvents() {
        ipc.handle("openai:send-message", async (_, { apiKey, baseURL, model }, contextMessages, content) => {
            const mainWindow = windowService.getMainWindow();
            this.client = new OpenAI({ apiKey, baseURL });
            const stream = await this.client.chat.completions.create({
                model,
                messages: [...contextMessages, { role: "user", content }],
                stream: true,
            });
            for await (const chunk of stream) {
                ipc.send(mainWindow.webContents, "openai:chat-stream", chunk);
            }
        });
    }

    public static getInstance() {
        return this.instance ?? (this.instance = new OpenAIService());
    }

    public init() {
        super.init();
        this.setupIpcEvents();
    }
}

export const openaiService = OpenAIService.getInstance();
