/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import { stopPropagation } from '@ringcentral-integration/utils';
import {
  RcIconButton,
  RcText,
  useInterval,
  useLongPress,
} from '@ringcentral/juno';
import { ResetZoom, ZoomIn, ZoomOut } from '@ringcentral/juno-icon';
import React, {
  forwardRef,
  HTMLAttributes,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

export type ZoomActionType = {
  setRate: React.Dispatch<React.SetStateAction<number>>;
};

const ZoomAction = forwardRef<
  ZoomActionType,
  {
    onZoom: (scale: number) => void;
    min: number;
    max: number;
  } & HTMLAttributes<HTMLDivElement>
>(({ onZoom, min, max, ...props }, ref) => {
  const [rate, setRate] = useState(1);

  useImperativeHandle(ref, () => ({
    setRate,
  }));

  const { play: zoomOutStart, cancel: zoomOutCancel } = useInterval(
    (times) => {
      // use power to make zoom out faster
      onZoom(rate - 0.1 * Math.pow(times, 2));
    },
    300,
    false,
  );

  const { play: zoomInStart, cancel: zoomInCancel } = useInterval(
    (times) => {
      // use power to make zoom in faster
      onZoom(rate + 0.1 * Math.pow(times, 2));
    },
    300,
    false,
  );

  const cancelEvents = useMemo(() => {
    const cancelZoom = () => {
      zoomOutCancel();
      zoomInCancel();
    };
    return {
      onMouseUp: cancelZoom,
      onTouchEnd: cancelZoom,
      onKeyUp: cancelZoom,
    };
  }, [zoomInCancel, zoomOutCancel]);

  const { ref: zoomOutRef, ...zoomOutEvents } = useLongPress(
    {
      onPress: zoomOutStart,
      onTap: () => {
        onZoom(rate - 0.1);
      },
    },
    cancelEvents,
  );

  const { ref: zoomInRef, ...zoomInEvents } = useLongPress(
    {
      onPress: zoomInStart,
      onTap: () => {
        onZoom(rate + 0.1);
      },
    },
    cancelEvents,
  );

  return (
    <div
      {...props}
      onClick={stopPropagation}
      className="flex gap-2 h-10 items-center absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-neutral-b5 rounded-full px-4 shadow-lg"
    >
      <RcIconButton
        ref={zoomOutRef}
        variant="plain"
        aria-label="Zoom out"
        symbol={ZoomOut}
        disabled={rate === min}
        {...zoomOutEvents}
      />
      <RcText color="neutral.f06">{Math.round(rate * 100)}%</RcText>
      <RcIconButton
        variant="plain"
        aria-label="Zoom in"
        symbol={ZoomIn}
        disabled={rate === max}
        ref={zoomInRef}
        {...zoomInEvents}
      />
      <RcIconButton
        variant="plain"
        aria-label="Reset zoom"
        symbol={ResetZoom}
        disabled={rate === 1}
        onClick={() => {
          onZoom(1);
        }}
      />
    </div>
  );
});

export { ZoomAction };
