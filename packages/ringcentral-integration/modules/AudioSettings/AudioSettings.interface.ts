import type { Alert } from '../Alert';
import type { AppFeatures } from '../AppFeatures';
import type { Auth } from '../Auth';
import type { Storage } from '../Storage';

export interface AudioSettingsData {
  dialButtonVolume: number;
  dialButtonMuted: boolean;
  ringtoneVolume: number;
  ringtoneMuted: boolean;
  callVolume: number;
  outputDeviceId: string;
  inputDeviceId: string;
  hasAutoPrompted: boolean;
}

export interface AudioSettingsOptions {}

export interface Deps {
  auth: Auth;
  alert: Alert;
  storage: Storage;
  appFeatures: AppFeatures;
  audioSettingsOptions?: AudioSettingsOptions;
}
