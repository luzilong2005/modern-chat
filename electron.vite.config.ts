import { defineConfig } from "electron-vite";
import { type AliasOptions } from "vite";
import path from "node:path";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
const ROOT_DIR = path.join(__dirname, ".");
const OUT_DIR = path.join(ROOT_DIR, "out");
const SRC_DIR = path.join(ROOT_DIR, "src");

const BASE_ALIAS: AliasOptions = {
    "@shared": path.join(SRC_DIR, "shared/index.ts"),
};

export default defineConfig({
    main: {
        resolve: {
            alias: {
                ...BASE_ALIAS,
            },
        },
        build: {
            bytecode: true,
            outDir: path.join(OUT_DIR, "main"),
            lib: {
                entry: path.join(SRC_DIR, "main/main.ts"),
            },
        },
    },
    preload: {
        build: {
            bytecode: true,
            outDir: path.join(OUT_DIR, "preload"),
            lib: {
                entry: path.join(SRC_DIR, "preload/preload.ts"),
            },
        },
    },
    renderer: {
        plugins: [vue(), tailwindcss()],
        resolve: {
            alias: {
                ...BASE_ALIAS,
                "@locales": path.join(ROOT_DIR, "locales"),
                "@renderer": path.join(SRC_DIR, "renderer/src"),
            },
        },
        build: {
            outDir: path.join(OUT_DIR, "renderer"),
        },
    },
});
