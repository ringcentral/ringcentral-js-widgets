import { RefOrElementOrCallback } from '@ringcentral/juno';
export declare const useHammerZoom: (target: RefOrElementOrCallback | EventTarget, { container, min, max, onScale, onDragChange, }: {
    container: RefOrElementOrCallback | EventTarget;
    min: number;
    max: number;
    onScale: (scale: number) => void;
    onDragChange: (state: boolean) => void;
}) => {
    zoom: (toScale: number) => void;
    reset: () => void;
};
