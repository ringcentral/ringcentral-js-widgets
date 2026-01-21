import clsx from 'clsx';
import React, { FC, useMemo } from 'react';

type VolumeGaugeProps = {
  size?: number;
  volume: number;
  isRecording?: boolean;
};

const GaugeWrapper: FC<{
  size: number;
}> = ({ children, size, ...rest }) => {
  const width = size * 8;
  return (
    <div
      className={clsx('inline-block align-middle h-4 overflow-hidden m-0')}
      style={{ width: `${width}px` }}
      {...rest}
    >
      {children}
    </div>
  );
};

const Gauge: FC<{
  volume: number;
}> = ({ children, volume, ...rest }) => {
  const transformData = -50 + volume / 2;
  return (
    <div
      className={clsx('inline-block whitespace-nowrap w-auto')}
      style={{ transform: `translateX(${transformData}%)` }}
      {...rest}
    >
      {children}
    </div>
  );
};

const Dot: FC<{
  inactive?: boolean;
  isRecording?: boolean;
}> = ({ children, inactive, isRecording, ...rest }) => {
  let backgroundColor = 'bg-neutral-b4';
  if (!inactive && !isRecording) {
    backgroundColor = 'bg-success';
  }
  if (isRecording) {
    backgroundColor = 'bg-danger';
  }
  return (
    <div
      className={clsx(
        'inline-block w-1 h-3.5 mx-0.5 my-px rounded-sm',
        backgroundColor,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export const VolumeGauge = ({
  size = 16,
  volume = 0,
  isRecording = false,
  ...rest
}: VolumeGaugeProps) => {
  const dots = useMemo(() => Array(size).fill(0), [size]);

  return (
    <GaugeWrapper size={size} {...rest}>
      <Gauge volume={volume}>
        {dots.map((_, i) => (
          <Dot key={i} isRecording={isRecording} />
        ))}
        {dots.map((_, i) => (
          <Dot key={i} inactive />
        ))}
      </Gauge>
    </GaugeWrapper>
  );
};
