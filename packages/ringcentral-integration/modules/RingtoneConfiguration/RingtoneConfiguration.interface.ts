import type { AudioSettings } from '../AudioSettings';
import type { Storage } from '../Storage';
import type { Webphone } from '../Webphone';

export interface RingtoneConfigurationOptions {
  enableCustomRingtone?: boolean;
  defaultRingtoneList?: RingtoneItem[];
}

export interface Deps {
  audioSettings: AudioSettings;
  storage: Storage;
  webphone: Webphone;
  ringtoneConfigurationOptions?: RingtoneConfigurationOptions;
}

export type RingtoneItem = {
  id: string;
  url: string;
  type: 'custom' | 'default';
  name: string;
};

export type AudioInfo = {
  fileName: string;
  dataUrl: string;
};
