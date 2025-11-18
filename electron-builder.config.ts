import { type Configuration } from "electron-builder";

const config: Configuration = {
    productName: "ModernChat",
    files: ["out", "locales", "resources"],
    directories: {
        output: "release",
        buildResources: "resources/build",
    },
    win: {
        target: [
            {
                target: "zip",
                arch: ["x64", "arm64"],
            },
            {
                target: "nsis",
                arch: ["x64", "arm64"],
            },
        ],
    },
    nsis: {
        oneClick: false,
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        installerLanguages: ["zh_CN"],
        allowToChangeInstallationDirectory: true,
    },
    electronDownload: {
        mirror: "https://npmmirror.com/mirrors/electron/",
    },
    publish: null,
};

export default config;
