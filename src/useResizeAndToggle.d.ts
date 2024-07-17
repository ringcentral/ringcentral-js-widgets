import { RefOrElementOrCallback } from '@ringcentral/juno';
import React from 'react';
export declare const DragAnchor: import("styled-components").StyledComponentClass<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
    direction?: "left" | "right";
}, import("@ringcentral/juno").RcTheme, React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
    direction?: "left" | "right";
}>;
export type DragResizeState = {
    show: boolean;
    width: number;
};
export type UseResizeAndToggleOptions = {
    /**
     * direction to increase size
     *
     * @default 'right'
     */
    direction?: 'left' | 'right';
    getCacheStateAndAction: () => [
        DragResizeState,
        (value: DragResizeState) => void
    ];
};
/**
 * group resize and toggle logic together,
 * let you can control resize and toggle easily.
 */
export declare const useResizeAndToggle: (target: RefOrElementOrCallback | EventTarget, { getCacheStateAndAction, direction }: UseResizeAndToggleOptions) => {
    show: boolean;
    setShow: (show: boolean) => void;
    dragNode: JSX.Element;
};
