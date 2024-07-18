import {
  getRefElement,
  RefOrElementOrCallback,
  useEventListener,
} from '@ringcentral/juno';
import { useRef } from 'react';

import { useHammer } from '../useHammer';

import { bindHammerZoom } from './bind-hammer-zoom';

export const useHammerZoom = (
  target: RefOrElementOrCallback | EventTarget,
  {
    container,
    min,
    max,
    onScale,
    onDragChange,
  }: {
    container: RefOrElementOrCallback | EventTarget;
    min: number;
    max: number;
    onScale: (scale: number) => void;
    onDragChange: (state: boolean) => void;
  },
) => {
  const zoomActionRef = useRef<ReturnType<typeof bindHammerZoom>>();

  useHammer(target, (manager) => {
    const targetRefElm = getRefElement(target as HTMLElement)!;
    const containerRefElm = getRefElement(container as HTMLElement)!;

    targetRefElm.style.scale = 'var(--scale, 1)';
    targetRefElm.style.transformOrigin = 'var(--origin)';
    targetRefElm.style.translate = 'var(--x) var(--y) 0';

    const events = [
      new Hammer.Pinch(),
      new Hammer.Tap({ event: 'doubletap', taps: 2 }),
      new Hammer.Pan({ threshold: 0 }),
    ];

    events.forEach((recognizer) => {
      manager.add(recognizer);
    });

    zoomActionRef.current = bindHammerZoom({
      hammer: manager,
      min,
      max,
      getTarget: () => targetRefElm,
      getContainer: () => containerRefElm!,
      onScale,
      onDragChange,
    });
  });

  useEventListener(container, 'wheel', (e: WheelEvent) => {
    const action = zoomActionRef.current;

    action?.zoomStart({ x: e.clientX, y: e.clientY });
    action?.zooming(e.deltaY < 0 ? 1.1 : 0.9);

    e.preventDefault();
  });

  return {
    zoom: (toScale: number) => {
      zoomActionRef.current?.zoom(toScale);
    },
    reset: () => {
      zoomActionRef.current?.reset();
    },
  };
};
