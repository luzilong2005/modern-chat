import { PAGE_ROUTE_PATH, SETTINGS_ROUTE_PATH } from "@renderer/enums";
import { createRouter, createWebHistory } from "vue-router";
export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: PAGE_ROUTE_PATH.MAIN,
        },
        {
            path: PAGE_ROUTE_PATH.MAIN,
            component: () => import("@renderer/pages/main"),
            children: [
                {
                    path: `${PAGE_ROUTE_PATH.CHAT}/:conversationId?`,
                    component: () => import("@renderer/pages/chat"),
                },
                {
                    path: PAGE_ROUTE_PATH.HISTORY,
                    component: () => import("@renderer/pages/history"),
                },
            ],
        },
        {
            path: PAGE_ROUTE_PATH.SETTINGS,
            redirect: SETTINGS_ROUTE_PATH.APPEARANCE,
            component: () => import("@renderer/pages/settings"),
            children: [
                {
                    path: SETTINGS_ROUTE_PATH.APPEARANCE,
                    component: () => import("@renderer/pages/settings/views/AppearanceView.vue"),
                },
                {
                    path: SETTINGS_ROUTE_PATH.ADVANCED,
                    component: () => import("@renderer/pages/settings/views/AdvancedView.vue"),
                },
            ],
        },
        {
            path: PAGE_ROUTE_PATH.ABOUT,
            component: () => import("@renderer/pages/about"),
        },
        {
            path: "/dialog",
            children: [
                {
                    path: "add-model",
                    component: () => import("@renderer/pages/dialog/AddModelDialog.vue"),
                },
                {
                    path: "edit-model/:id",
                    component: () => import("@renderer/pages/dialog/EditModelDialog.vue"),
                },
            ],
        },
    ],
});
