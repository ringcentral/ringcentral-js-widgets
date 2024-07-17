import {
  css,
  getRefElement,
  px,
  RefOrElementOrCallback,
  styled,
  useEventCallback,
  useResultRef,
} from '@ringcentral/juno';
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { usePanMove } from './usePanMove';

export const DragAnchor = styled.div<{ direction?: 'left' | 'right' }>`
  width: 10px;
  position: absolute;
  user-select: none;
  height: 100%;
  top: 0;
  ${({ direction }) =>
    direction === 'right'
      ? css`
          right: 0;
          transform: translateX(50%);
        `
      : css`
          left: 0;
          transform: translateX(-50%);
        `}
  cursor: col-resize;
  z-index: 1;
`;

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
    (value: DragResizeState) => void,
  ];
};

/**
 * group resize and toggle logic together,
 * let you can control resize and toggle easily.
 */
export const useResizeAndToggle = (
  target: RefOrElementOrCallback | EventTarget,
  { getCacheStateAndAction, direction = 'right' }: UseResizeAndToggleOptions,
) => {
  const { current: cacheStateAndAction } = useResultRef(() =>
    getCacheStateAndAction(),
  );
  const [cacheState, setCacheState] = cacheStateAndAction;

  const [show, setShow] = useState(cacheState.show);
  const widthRef = useRef(cacheState.width);
  const dragAnchorRef = useRef<HTMLDivElement>(null);

  usePanMove(dragAnchorRef, {
    onMove: (delta) => {
      const targetElm = getRefElement(target as HTMLElement)!;

      if (!targetElm) return;

      // set width directly, make performance better
      targetElm.style.width = px(
        widthRef.current + (direction === 'right' ? delta : -delta),
      );
    },
    onMoveEnd: () => {
      const targetElm = getRefElement(target as HTMLElement)!;
      if (!targetElm) return;

      // only trigger cache when move end and release change
      widthRef.current = targetElm.clientWidth;
      setCacheState({ show, width: widthRef.current });
    },
  });

  useLayoutEffect(() => {
    const targetElm = getRefElement(target as HTMLElement)!;
    if (!targetElm) return;

    targetElm.style.width = px(widthRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    show,
    setShow: useEventCallback((show: boolean) => {
      setShow(show);
      setCacheState({ show, width: widthRef.current });
    }),
    dragNode: useMemo(
      () => <DragAnchor ref={dragAnchorRef} direction={direction} />,
      [direction],
    ),
  };
};
