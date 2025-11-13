import { ROUTE_NAME } from "@renderer/enums";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/main",
        },
        {
            path: "/main",
            name: ROUTE_NAME.MAIN,
            redirect: { name: ROUTE_NAME.CHAT },
            component: () => import("@renderer/pages/main"),
            children: [
                {
                    path: "chat",
                    name: ROUTE_NAME.CHAT,
                    component: () => import("@renderer/pages/chat"),
                },
                {
                    path: "history",
                    name: ROUTE_NAME.HISTORY,
                    component: () => import("@renderer/pages/history"),
                },
            ],
        },
        {
            path: "/about",
            name: ROUTE_NAME.ABOUT,
            component: () => import("@renderer/pages/about"),
        },
        {
            path: "/settings",
            name: ROUTE_NAME.SETTINGS,
            component: () => import("@renderer/pages/settings"),
        },
        {
            path: "/add-model",
            component: () => import("@renderer/pages/settings/dialogs/AddModelDialog.vue"),
        },
        {
            path: "/edit-model",
            component: () => import("@renderer/pages/settings/dialogs/EditModelDialog.vue"),
        }
    ],
});

export { router };
