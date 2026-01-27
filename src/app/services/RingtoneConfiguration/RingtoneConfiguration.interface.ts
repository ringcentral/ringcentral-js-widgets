export interface RingtoneConfigurationOptions {
  enableCustomRingtone?: boolean;
  defaultRingtoneList?: RingtoneItem[];
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
