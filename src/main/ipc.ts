import { IpcEmitter, IpcListener } from "@electron-toolkit/typed-ipc/main";
import type { IpcEvents, IpcRendererEvents } from "@shared";
const ipcEmitter = new IpcEmitter<IpcRendererEvents>();
const ipcListener = new IpcListener<IpcEvents>();

export const ipc = {
    send: ipcEmitter.send.bind(ipcEmitter),
    on: ipcListener.on.bind(ipcListener),
    handle: ipcListener.handle.bind(ipcListener),
};
