import { useHammer } from '@ringcentral-integration/react-hooks';
import { px } from '@ringcentral/juno';
import React, { FC, useRef } from 'react';

import { isCoordInViewport } from './utils';

export const Draggable: FC = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const elementPos = useRef<Record<'x' | 'y', number>>({ x: 0, y: 0 });
  const isDragging = useRef(false);

  useHammer(ref, (hammer) => {
    const pan = new Hammer.Pan({
      direction: Hammer.DIRECTION_ALL,
      threshold: 0,
    });

    hammer.add(pan);
    hammer.on('pan', (ev: HammerInput) => {
      const elem = ev.target;

      if (!isDragging.current) {
        isDragging.current = true;
        elementPos.current.x = elem.offsetLeft;
        elementPos.current.y = elem.offsetTop;
      }

      const { x, y } = elementPos.current || {};

      const posX = ev.deltaX + x;
      const posY = ev.deltaY + y;

      if (isCoordInViewport(posX, posY)) {
        elem.style.left = px(posX);
        elem.style.top = px(posY);
      }

      if (ev.isFinal) {
        isDragging.current = false;
      }
    });
  });

  return (
    <div className="draggable-root" ref={ref} data-sign="draggable-root">
      {children}
    </div>
  );
};
