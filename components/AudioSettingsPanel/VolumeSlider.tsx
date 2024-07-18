import { RcIcon, RcSlider, styled } from '@ringcentral/juno';
import { Audio, AudioSp } from '@ringcentral/juno-icon';
import React, { FC } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const VolumeIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PaddedSlider = styled(RcSlider)`
  margin: 0 16px;
`;
function toPercentValue(value: number) {
  return Math.floor(value * 100);
}
function toValue(percent: number) {
  return percent / 100;
}
export const VolumeSlider: FC<{
  className?: string;
  volume: number;
  minVolume?: number;
  maxVolume?: number;
  onChange: (volume: number) => void;
}> = ({ className, volume, minVolume = 0, maxVolume = 1, onChange }) => {
  return (
    <Container className={className}>
      <VolumeIconContainer>
        <RcIcon symbol={AudioSp} />
      </VolumeIconContainer>
      <PaddedSlider
        min={toPercentValue(minVolume)}
        max={toPercentValue(maxVolume)}
        value={toPercentValue(volume)}
        step={10}
        // cast value to number as we are not using ranged slider
        onChange={(_, value) => onChange(toValue(value as number))}
      />
      <VolumeIconContainer>
        <RcIcon symbol={Audio} />
      </VolumeIconContainer>
    </Container>
  );
};
