import { app } from "electron";
import { windowService } from "./services/window";
import { LOG_ERROR, LOG_INFO, logService } from "./services/log";
import { versionService } from "./services/version";
import { appService } from "./services/app";
import { clipboardService } from "./services/clipboard";
import { contextMenuService } from "./services/contextmenu";
import { trayService } from "./services/tray";
import { fileService } from "./services/file";
import { dialogService } from "./services/dialog";
import { themeService } from "./services/theme";
import { databaseService } from "./services/database";
import { openaiService } from "./services/openai";

const main = () => {
    logService.init();

    process.addListener("uncaughtException", (error) => {
        LOG_ERROR(error);
    });
    process.addListener("unhandledRejection", (error) => {
        LOG_ERROR(error);
    });

    appService.init();
    clipboardService.init();
    contextMenuService.init();
    databaseService.init();
    dialogService.init();
    fileService.init();
    openaiService.init();
    themeService.init();
    trayService.init();
    versionService.init();
    windowService.init();
};

app.whenReady().then(() => {
    LOG_INFO("App is ready");
    main();
});
