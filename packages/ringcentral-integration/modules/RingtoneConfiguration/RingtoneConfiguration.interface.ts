import type { Alert } from '../Alert';
import type { Storage } from '../Storage';
import type { Webphone } from '../Webphone';

export interface RingtoneConfigurationOptions {
  enableCustomRingtone?: boolean;
  defaultRingtoneList?: RingtoneItem[];
}

export interface Deps {
  storage: Storage;
  webphone: Webphone;
  alert: Alert;
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
