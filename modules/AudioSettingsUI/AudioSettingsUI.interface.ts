import type { Alert } from '@ringcentral-integration/commons/modules/Alert';
import type { AudioSettings } from '@ringcentral-integration/commons/modules/AudioSettings';
import type { CallMonitor } from '@ringcentral-integration/commons/modules/CallMonitor';
import type { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RingtoneConfiguration } from '@ringcentral-integration/commons/modules/RingtoneConfiguration';
import type { VolumeInspector } from '@ringcentral-integration/commons/modules/VolumeInspector';
import type { Webphone } from '@ringcentral-integration/commons/modules/Webphone';

import type { RouterInteraction } from '../RouterInteraction';

export interface AudioSettingsUIOptions {
  //
  showRingToneVolume?: boolean;
  showCallVolume?: boolean;
}

export interface Deps {
  audioSettings: AudioSettings;
  locale: Locale;
  callingSettings: CallingSettings;
  routerInteraction: RouterInteraction;
  callMonitor: CallMonitor;
  volumeInspector?: VolumeInspector;
  ringtoneConfiguration?: RingtoneConfiguration;
  webphone?: Webphone;
  alert?: Alert;
  audioSettingsUIOptions?: AudioSettingsUIOptions;
}
