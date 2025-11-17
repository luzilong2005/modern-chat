import { type Configuration } from "electron-builder";

const config: Configuration = {
    productName: "ModernChat",
    files: ["out", "locales", "resources"],
    directories: {
        output: "release",
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
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        installerLanguages: ["zh_CN"],
        allowToChangeInstallationDirectory: true,
    },
    electronDownload: {
        mirror: "https://npmmirror.com/mirrors/electron/",
    }
};

export default config;
