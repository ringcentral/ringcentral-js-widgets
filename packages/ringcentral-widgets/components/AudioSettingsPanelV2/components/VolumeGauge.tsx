import { styled, palette2 } from '@ringcentral/juno';
import React, { useMemo } from 'react';

type VolumeGaugeProps = {
  size?: number;
  volume: number;
  isRecording?: boolean;
};

const inactiveDotColor = palette2('neutral', 'l02');
const activeDotColor = palette2('success', 'b05');
const recordingDotColor = palette2('danger', 'b04');
const dotDistance = 4;
const dotWidth = 4;
const dotHeight = 14;
const dotCompleteWidth = dotWidth + dotDistance;

const computeWidthFn = ({ size }: { size: number }) => {
  return size * dotCompleteWidth;
};

const GaugeWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  height: ${dotHeight + 2}px;
  margin: 0;
  overflow: hidden;
  width: ${computeWidthFn}px;
`;

const computeVolumeFn = ({ volume }: { volume: number }) => {
  return -50 + volume / 2;
};

const Gauge = styled.div`
  display: inline-block;
  white-space: nowrap;
  width: auto;
  transform: translateX(${computeVolumeFn}%);
`;

const computeBackgroundFn = ({
  inactive,
  isRecording,
}: {
  inactive?: boolean;
  isRecording?: boolean;
}) => {
  if (!inactive && !isRecording) {
    return activeDotColor;
  }
  return isRecording ? recordingDotColor : inactiveDotColor;
};

const Dot = styled.div`
  display: inline-block;
  width: ${dotWidth}px;
  height: ${dotHeight}px;
  margin: 1px ${dotDistance / 2}px;
  border-radius: ${dotWidth / 2}px;
  background: ${computeBackgroundFn};
`;

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
