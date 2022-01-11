import { AudioSettings } from '@ringcentral-integration/commons/modules/AudioSettingsV2';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettingsV2';
import { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitorV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';

import { RouterInteraction } from '../RouterInteraction';

export interface AudioSettingsUIOptions {
  //
}

export interface Deps {
  audioSettings: AudioSettings;
  locale: Locale;
  callingSettings: CallingSettings;
  routerInteraction: RouterInteraction;
  callMonitor: CallMonitor;
  webphone?: Webphone;
  audioSettingsUIOptions?: AudioSettingsUIOptions;
}

// TODO: move to AudioSettingsPanel
export interface AudioSettingsPanelProps {
  currentLocale: string;
  dialButtonVolume: number;
  dialButtonMuted: boolean;
  ringtoneVolume: number;
  ringtoneMuted: boolean;
  callVolume: number;
  availableInputDevices: MediaDeviceInfo[];
  inputDeviceId: string;
  availableOutputDevices: MediaDeviceInfo[];
  outputDeviceId: string;
  supportDevices: boolean;
  userMedia: boolean;
  isWebRTC: boolean;
  outputDeviceDisabled: boolean;
  inputDeviceDisabled: boolean;
  onBackButtonClick: () => Promise<void>;
  onSave: AudioSettings['setData'];
  checkUserMedia: () => Promise<void>;
}
