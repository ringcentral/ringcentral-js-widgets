/* eslint-disable jest/expect-expect */
import { render, fireEvent } from '@ringcentral-integration/test-utils';
import React from 'react';

import {
  AudioSettingsPanel,
  getDeviceValueRenderer,
  getFallbackLabel,
} from '../../components/AudioSettingsPanel';

describe('AudioSettingsPanel', () => {
  const props = {
    availableInputDevices: [],
    availableOutputDevices: [],
    callVolume: 0,
    checkUserMedia: jest.fn(),
    currentLocale: 'en-US',
    inputDeviceDisabled: false,
    inputDeviceId: '',
    onBackButtonClick: jest.fn(),
    onSave: jest.fn(),
    outputDeviceDisabled: false,
    outputDeviceId: '',
    ringtoneVolume: 0,
    showCallVolume: false,
    showRingToneVolume: false,
    supportDevices: true,
    userMedia: null,
  };

  it('renders without crashing', () => {
    // @ts-ignore
    render(<AudioSettingsPanel {...props} />);
  });

  it('calls checkUserMedia when check microphone permission button is clicked, and showCallVolume', () => {
    const { getByTestId } = render(
      // @ts-ignore
      <AudioSettingsPanel {...props} showCallVolume />,
    );
    const checkMicPermissionButton = getByTestId('checkMicPermission');
    fireEvent.click(checkMicPermissionButton);
    expect(props.checkUserMedia).toHaveBeenCalled();
  });

  // Add more tests as needed
});

describe('getFallbackLabel', () => {
  it('should return fallback label with index if there are multiple devices', () => {
    const devices = [
      { deviceId: '1', groupId: '1' },
      { deviceId: '2', groupId: '2' },
    ]; // Example array with more than one device
    const index = 1;
    const currentLocale = 'en-US';

    const result = getFallbackLabel(devices, index, currentLocale);

    expect(result).toBe('Unknown device 2'); // Since it is the second device (index 1 + 1)
  });

  it('should return just the fallback label if there is only one device', () => {
    const devices = [{ deviceId: '1' }]; // Example array with only one device
    const index = 0;
    const currentLocale = 'en-US';

    const result = getFallbackLabel(devices, index, currentLocale);

    expect(result).toBe('Unknown device'); // There's only one device, so no index should be appended
  });
});

describe('getDeviceValueRenderer', () => {
  const mockDevices = [
    { deviceId: '12345', label: 'Device A' },
    { deviceId: '67890', label: 'Device B' },
    // ... other devices
  ];
  const currentLocale = 'en-US';

  it('returns "no device" string if value is null', () => {
    const noDeviceString = 'No device';
    const renderer = getDeviceValueRenderer(mockDevices, currentLocale);
    expect(renderer(null)).toBe(noDeviceString);
  });

  it('returns the correct device label when device ID matches', () => {
    const renderer = getDeviceValueRenderer(mockDevices, currentLocale);
    expect(renderer('12345')).toBe('Device A');
  });

  it('calls getFallbackLabel when device ID is not found', () => {
    const fallbackLabel = 'Unknown device 0';
    const invalidDeviceId = 'invalid-id';
    const renderer = getDeviceValueRenderer(mockDevices, currentLocale);
    expect(renderer(invalidDeviceId)).toBe(fallbackLabel);
  });
});
