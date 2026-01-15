import { type OmitFunctions } from '@ringcentral-integration/utils/src/typeFunctions/OmitFunctions';
import {
  RcSelect,
  RcMenuItem,
  RcListItemText,
  type RcSelectProps,
  RcTypography,
  RcTooltip,
} from '@ringcentral/juno';
import React from 'react';
import type { FC } from 'react';

import { t } from '../i18n';
import styles from '../styles.scss';

export const SelectDevice = ({ children, label, ...props }: RcSelectProps) => (
  <div className={styles.selectContainer}>
    <RcTypography variant="body2" color="neutral.f06">
      {label}
    </RcTypography>
    <RcSelect variant="box" fullWidth {...props}>
      {children}
    </RcSelect>
  </div>
);

export const getFallbackLabel = (device: OmitFunctions<MediaDeviceInfo>) => {
  const fallbackLabel = t('noLabel');
  const deviceId = device.deviceId ? `(${device.deviceId.slice(-4)})` : '';
  return `${fallbackLabel}${deviceId}`;
};

export const getDeviceOptionRenderer = (
  device: OmitFunctions<MediaDeviceInfo>,
) => {
  if (device && device.label) {
    return device.label;
  }
  if (device && device.deviceId === 'off') {
    return t('off');
  }
  return getFallbackLabel(device);
};

export const AudioDeviceSelect: FC<{
  availableDevices: OmitFunctions<MediaDeviceInfo>[];
  isDisabled?: boolean;
  deviceId: string;
  onChange: (deviceId: string) => void;
  label: string;
  dataSign: string;
}> = ({
  availableDevices = [],
  onChange,
  isDisabled,
  deviceId,
  label,
  dataSign,
}) => {
  const allDevicesAreEmpty = availableDevices.every(
    (item) =>
      (item.label === '' && item.deviceId === '') ||
      (item.label === '' && item.deviceId === 'off'),
  );
  if (!availableDevices.length || allDevicesAreEmpty) {
    return (
      <SelectDevice label={label} value="default" disabled data-sign={dataSign}>
        <RcMenuItem value="default">
          <RcListItemText primary={t('noDevices')} />
        </RcMenuItem>
      </SelectDevice>
    );
  }
  return (
    <SelectDevice
      data-sign={dataSign}
      value={deviceId}
      onChange={(e) => {
        const deviceId = e.target.value;
        onChange(deviceId as string);
      }}
      disabled={isDisabled}
      label={label}
    >
      {availableDevices.map((device) => (
        <RcMenuItem key={device.deviceId} value={device.deviceId}>
          <RcTooltip title={getDeviceOptionRenderer(device)}>
            <RcListItemText primary={getDeviceOptionRenderer(device)} />
          </RcTooltip>
        </RcMenuItem>
      ))}
    </SelectDevice>
  );
};
