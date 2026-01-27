/* eslint-disable react/destructuring-assignment */
import { type OmitFunctions } from '@ringcentral-integration/utils/src/typeFunctions/OmitFunctions';
import {
  Select,
  Option,
  ListItemText,
  type SelectProps,
  Text,
} from '@ringcentral/spring-ui';
import React from 'react';
import type { FC } from 'react';

import { t } from '../i18n';

export const SelectDevice = ({ children, label, ...props }: SelectProps) => (
  <div className="mb-4">
    <Text component="p" className="typography-mainText text-neutral-b0 mb-2">
      {label}
    </Text>
    <Select
      size="medium"
      classes={{
        content: 'border-none',
      }}
      className="w-full [&_.sui-form-field-focus-effect]:border-none"
      {...props}
    >
      {children}
    </Select>
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
  let label;
  if (device && device.label) {
    label = device.label;
  } else if (device && device.deviceId === 'off') {
    label = t('off');
  } else {
    label = getFallbackLabel(device);
  }
  return label;
};

export const AudioDeviceSelect: FC<{
  availableDevices: OmitFunctions<MediaDeviceInfo>[];
  isDisabled?: boolean;
  deviceId: string;
  onChange: (deviceId: string) => void;
  label: string;
}> = ({
  availableDevices = [],
  onChange,
  isDisabled,
  deviceId,
  label,
  ...rest
}) => {
  const allDevicesAreEmpty = availableDevices.every(
    (item) =>
      (item.label === '' && item.deviceId === '') ||
      (item.label === '' && item.deviceId === 'off'),
  );

  if (!availableDevices.length || allDevicesAreEmpty) {
    return (
      <SelectDevice
        label={label}
        value="default"
        disabled
        renderValue={() => t('noDevices')}
        {...rest}
      >
        <Option value="default" key="default">
          <ListItemText primary={t('noDevices')} />
        </Option>
      </SelectDevice>
    );
  }

  return (
    <SelectDevice
      {...rest}
      value={deviceId}
      onChange={(e) => {
        const deviceId = e.target.value;
        onChange(deviceId as string);
      }}
      renderValue={(id) => {
        const selected = availableDevices.find(
          (option) => option.deviceId === id,
        );
        if (!selected) return '';

        const render = getDeviceOptionRenderer(selected);
        return (
          <span
            title={render}
            className="text-neutral-b2 typography-descriptor"
          >
            {render}
          </span>
        );
      }}
      disabled={isDisabled}
      label={label}
    >
      {availableDevices.map((device) => {
        const render = getDeviceOptionRenderer(device);
        return (
          <Option key={device.deviceId} value={device.deviceId}>
            <ListItemText title={render} primary={render} />
          </Option>
        );
      })}
    </SelectDevice>
  );
};
