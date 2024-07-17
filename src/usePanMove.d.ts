import { RefOrElementOrCallback } from '@ringcentral/juno';
type UsePanResizeOptions = {
    onMove: (delta: number) => void;
    direction?: 'horizontal' | 'vertical';
    onMoveStart?: () => void;
    onMoveEnd?: () => void;
};
export declare const usePanMove: (target: RefOrElementOrCallback | EventTarget, { onMove, onMoveStart, onMoveEnd, direction, }: UsePanResizeOptions) => void;
export {};
