import { type Component, type HTMLAttributes } from "vue";
import { type PopoverPlacement } from "naive-ui";
export interface IconButtonProps {
    icon?: Component;
    placement?: PopoverPlacement;
    tooltip?: string;
    class?: HTMLAttributes["class"];
}
export interface IconButtonEmits {
    click: [ev: MouseEvent];
}
