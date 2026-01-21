import type { StepFunction } from '@ringcentral-integration/test-utils';

export interface MockDeviceProps {
  devices: {
    deviceId: string;
    kind: 'audioinput' | 'videoinput' | 'audiooutput';
    label: string;
    groupId: string;
  }[];
}

export const MockDevice: StepFunction<MockDeviceProps> = async ({
  devices,
}) => {
  Object.defineProperties(window.navigator.mediaDevices, {
    getUserMedia: {
      value() {
        return true;
      },
      configurable: true,
    },
    enumerateDevices: {
      value() {
        return devices;
      },
      configurable: true,
    },
  });
};
