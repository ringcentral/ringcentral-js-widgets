import type { AudioSettings } from '@ringcentral-integration/commons/modules/AudioSettings';
import type { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitor';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { Webphone } from '@ringcentral-integration/commons/modules/Webphone';

import type { RouterInteraction } from '../RouterInteraction';

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
