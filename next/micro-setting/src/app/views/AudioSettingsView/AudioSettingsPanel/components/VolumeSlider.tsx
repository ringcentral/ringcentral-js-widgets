import { MuteMd, VolumeMd } from '@ringcentral/spring-icon';
import { Icon, Slider, Text } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { type FC } from 'react';

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
  className?: string;
}> = ({
  volume,
  className,
  minVolume = 0,
  maxVolume = 1,
  onChange,
  label,
  dataSign,
}) => {
  return (
    <div className={clsx('flex flex-col', className)} data-sign={dataSign}>
      {label ? (
        <Text
          data-sign="label"
          component="p"
          className="typography-mainText text-neutral-b0 mb-2"
        >
          {label}
        </Text>
      ) : null}
      <div className="flex items-center">
        <div className="flex justify-center items-center">
          <Icon symbol={MuteMd} className="text-neutral-b2" size="medium" />
        </div>
        <Slider
          data-sign="slider"
          className="mx-4 my-0"
          min={toPercentValue(minVolume)}
          max={toPercentValue(maxVolume)}
          value={toPercentValue(volume)}
          valueLabelDisplay="auto"
          step={10}
          onChange={(_, value) => onChange(toValue(value as number))}
        />
        <div className="flex justify-center items-center">
          <Icon symbol={VolumeMd} className="text-neutral-b2" size="medium" />
        </div>
      </div>
    </div>
  );
};
