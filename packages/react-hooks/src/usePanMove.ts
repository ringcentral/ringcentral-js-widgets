import { RefOrElementOrCallback } from '@ringcentral/juno';

import { useHammer } from './useHammer';

type UsePanResizeOptions = {
  onMove: (delta: number) => void;
  direction?: 'horizontal' | 'vertical';
  onMoveStart?: () => void;
  onMoveEnd?: () => void;
};

export const usePanMove = (
  target: RefOrElementOrCallback | EventTarget,
  {
    onMove,
    onMoveStart,
    onMoveEnd,
    direction = 'horizontal',
  }: UsePanResizeOptions,
) => {
  useHammer(target, (hammer) => {
    const pan = new Hammer.Pan({
      direction:
        direction === 'horizontal'
          ? Hammer.DIRECTION_HORIZONTAL
          : Hammer.DIRECTION_VERTICAL,
      threshold: 0,
    });

    hammer.add(pan);

    hammer.on('panstart', () => {
      onMoveStart?.();
    });

    hammer.on('panleft panright', (e: HammerInput) => {
      const delta = e.deltaX;
      onMove(delta);
    });

    hammer.on('panend pancancel', () => {
      onMoveEnd?.();
    });
  });
};
