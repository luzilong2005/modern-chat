import { defineConfig } from "vitepress";

export default defineConfig({
    base: "/",
    title: "Modern Chat",
    description: "Modern Chat 文档",
    appearance: { initialValue: "dark" },
    themeConfig: {
        nav: [
            { text: "首页", link: "/" },
            { text: "下载", link: "/pages/downloads" },
        ],
        sidebar: [
            {
                text: "指南",
                base: "/pages/guide",
                items: [
                    { text: "快速开始", link: "/quickstart" },
                    {
                        text: "下载",
                        link: "/downloads",
                    },
                    {
                        text: "示例",
                        link: "/examples",
                    },
                ],
            },
        ],
        search: { provider: "local" },
        socialLinks: [{ icon: "github", link: "https://github.com/luzilong2005/modern-chat.git" }],
    },
});
