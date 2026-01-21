import { MockDeviceProps } from '../steps/Mock/MockDevice';

export const DEFAULT_DEVICES: MockDeviceProps['devices'] = [
  {
    deviceId: 'default',
    kind: 'audiooutput',
    label: 'Default - MacBook Pro Speakers (Built-in)',
    groupId: 'MacOutputGroupId',
  },
  {
    deviceId: 'default',
    kind: 'audioinput',
    label: 'MacBook Pro Microphone (Built-in)',
    groupId: 'macInputGroupId',
  },
  // virtual audio
  {
    deviceId: 'virtualOutputDeviceId',
    kind: 'audiooutput',
    label: 'Microsoft Teams Audio Device (Virtual)',
    groupId: 'virtualOutputGroupId',
  },
  // air pods
  {
    deviceId: 'airPodsOutputDeviceId',
    kind: 'audiooutput',
    label: 'AirPods',
    groupId: 'airPodsOutputGroupId',
  },
  {
    deviceId: 'airPodsInputDeviceId',
    kind: 'audioinput',
    label: 'AirPods',
    groupId: 'airPodsInputGroupId',
  },
];
