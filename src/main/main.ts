import { app } from "electron";
import {
    appService,
    clipboardService,
    contextmenuService,
    dialogService,
    logService,
    trayService,
    versionService,
    windowService,
    fileService,
    databaseService,
    openaiService,
} from "./services";
import { LOG_ERROR, LOG_INFO } from "./services/log";

const initAllServices = () => {
    appService.init();
    LOG_INFO("AppService initialized");

    contextmenuService.init();
    LOG_INFO("ContextMenuService initialized");

    logService.init();
    LOG_INFO("LogService initialized");

    trayService.init();
    LOG_INFO("TrayService initialized");

    versionService.init();
    LOG_INFO("VersionService initialized");

    windowService.init();
    LOG_INFO("WindowService initialized");

    dialogService.init();
    LOG_INFO("DialogService initialized");

    clipboardService.init();
    LOG_INFO("ClipboardService initialized");

    fileService.init();
    LOG_INFO("FileService initialized");

    databaseService.init();
    LOG_INFO("DatabaseService initialized");

    openaiService.init();
    LOG_INFO("OpenAIService initialized");
};

const main = () => {
    process.addListener("uncaughtException", (error) => {
        LOG_ERROR(error);
    });
    process.addListener("unhandledRejection", (error) => {
        LOG_ERROR(error);
    });
    initAllServices();
    windowService.createMainWindow();
};

app.whenReady().then(() => {
    LOG_INFO("App is ready");
    main();
});
