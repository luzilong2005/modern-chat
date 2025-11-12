interface AIModel {
    id: number;
    name: string;
    title: string;
    modelCodes: string[];
    config: {
        baseURL: string;
        apiKey: string;
    };
    createdAt: number;
    updatedAt: number;
}

export const models: Array<AIModel> = [
    {
        id: 1,
        name: "BigModel",
        title: "质谱AI",
        modelCodes: ["glm-4.5-flash"],
        config: {
            baseURL: "",
            apiKey: "3a26e08baa7846358cece5b979ed2653.uOSOBb1n1MU3B4f8",
        },
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
    },
];
