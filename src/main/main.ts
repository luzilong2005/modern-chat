import { app, webContents } from "electron";
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
} from "./services";

const initAllServices = () => {
    appService.init();
    contextmenuService.init();
    logService.init();
    trayService.init();
    versionService.init();
    windowService.init();
    dialogService.init();
    clipboardService.init();
    fileService.init();
    //databaseService.init();
};

const main = () => {
    process.addListener("uncaughtException", (error) => {
        logService.error(`${error}`);
    });
    process.addListener("unhandledRejection", (error) => {
        logService.error(`${error}`);
    });
    initAllServices();
    windowService.createMainWindow();

    
};

app.whenReady().then(() => {
    main();
});
