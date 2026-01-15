type BindHammerZoomOptions = {
    hammer: HammerManager;
    /**
     * min rate of zoom
     *
     * @default 1
     */
    min?: number;
    /**
     * max rate of zoom
     *
     * @default 10
     */
    max?: number;
    getTarget: () => HTMLElement;
    getContainer: () => HTMLElement;
    onScale?: (scale: number) => void;
    onDragChange?: (state: boolean) => void;
};
export declare const bindHammerZoom: ({ hammer, min, max, getTarget, getContainer, onScale, onDragChange, }: BindHammerZoomOptions) => {
    scale: number;
    reset: () => void;
    zoomCenter: () => void;
    toggle: () => void;
    zoomStart: (center: HammerPoint) => void;
    zooming: (rate: number) => void;
    zoom: (sourceScale: number) => void;
};
export {};
