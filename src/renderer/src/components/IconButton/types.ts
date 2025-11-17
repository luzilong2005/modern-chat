import { type Component, type HTMLAttributes } from "vue";

export type Placement =
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";

export interface IconButtonProps {
    icon?: Component;
    placement?: Placement;
    tooltip?: string;
    class?: HTMLAttributes["class"];
}
export interface IconButtonEmits {
    click: [ev: MouseEvent];
}
