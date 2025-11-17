import { IpcListener, IpcEmitter } from "@electron-toolkit/typed-ipc/renderer";
import { type IpcEvents, type IpcRendererEvents } from "@shared";
const ipcListener = new IpcListener<IpcRendererEvents>();
const ipcEmitter = new IpcEmitter<IpcEvents>();

export const ipc = {
    invoke: ipcEmitter.invoke.bind(ipcEmitter),
    send: ipcEmitter.send.bind(ipcEmitter),
    on: ipcListener.on.bind(ipcListener),
    once: ipcListener.once.bind(ipcListener),
};
