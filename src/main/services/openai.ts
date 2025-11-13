import OpenAI from "openai";
import { BaseService } from "./BaseService";
import { ipc } from "./ipc";

class OpenAIService extends BaseService {
    private static instance: OpenAIService | null = null;
    private client: OpenAI | null = null;
    private constructor() {
        super();
    }

    private setupIpcEvents() {
        ipc.handle("openai:send-message", async (_, { apiKey, baseURL, model }, content) => {
            console.log(content);
            this.client = new OpenAI({ apiKey, baseURL });
            const stream = await this.client.chat.completions.create({
                model,
                messages: [{ role: "user", content }],
                stream: true,
            });
            for await (const chunk of stream) {
                console.dir(chunk);
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

    public async chat() {}
}

export const openaiService = OpenAIService.getInstance();
