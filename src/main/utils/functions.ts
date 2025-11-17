import { screen } from "electron";

type WindowSize = { width: number; height: number };

export const getWindowInitialSize = (): WindowSize => {
    const { workArea } = screen.getPrimaryDisplay();
    const maxW = Math.floor(workArea.width * 0.7);
    const maxH = Math.floor(workArea.height * 0.8);

    return {
        width: maxW,
        height: maxH,
    };
};
