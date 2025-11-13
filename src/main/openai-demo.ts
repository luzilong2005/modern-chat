import OpenAI from "openai";
export async function openaiDemo() {
    const client = new OpenAI({
        apiKey: "3a26e08baa7846358cece5b979ed2653.uOSOBb1n1MU3B4f8",
        baseURL: "https://open.bigmodel.cn/api/paas/v4",
    });
    const stream = await client.chat.completions.create({
        model: "glm-4.5-flash",
        stream: true,
        messages: [{ role: "user", content: "静夜思" }],
    });
    for await (const chunk of stream) {
        console.log(chunk);
    }
}
