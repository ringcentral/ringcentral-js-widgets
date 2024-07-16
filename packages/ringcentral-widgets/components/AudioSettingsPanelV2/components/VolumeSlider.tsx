import { RcIcon, RcSlider, RcTypography } from '@ringcentral/juno';
import { SpeakerDown, SpeakerUp } from '@ringcentral/juno-icon';
import React, { type FC } from 'react';

import styles from '../styles.scss';

function toPercentValue(value: number) {
  return Math.floor(value * 100);
}
function toValue(percent: number) {
  return percent / 100;
}

export const VolumeSlider: FC<{
  volume: number;
  minVolume?: number;
  maxVolume?: number;
  onChange: (volume: number) => void;
  dataSign: string;
  label?: string;
}> = ({ volume, minVolume = 0, maxVolume = 1, onChange, label, dataSign }) => {
  return (
    <div className={styles.sliderContainer} data-sign={dataSign}>
      {label ? (
        <RcTypography
          data-sign="label"
          variant="body2"
          color="neutral.f06"
          className={styles.sliderLabel}
        >
          {label}
        </RcTypography>
      ) : null}
      <div className={styles.sliderVolume}>
        <div className={styles.sliderVolumeIconContainer}>
          <RcIcon symbol={SpeakerDown} color="neutral.f04" size="small" />
        </div>
        <RcSlider
          data-sign="slider"
          style={{ margin: '0 16px' }}
          min={toPercentValue(minVolume)}
          max={toPercentValue(maxVolume)}
          value={toPercentValue(volume)}
          step={10}
          // cast value to number as we are not using ranged slider
          onChange={(_, value) => onChange(toValue(value as number))}
        />
        <div className={styles.sliderVolumeIconContainer}>
          <RcIcon symbol={SpeakerUp} color="neutral.f04" size="small" />
        </div>
      </div>
    </div>
  );
};
