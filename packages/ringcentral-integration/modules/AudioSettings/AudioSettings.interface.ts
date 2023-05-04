import { Alert } from '../Alert';
import { AppFeatures } from '../AppFeatures';
import { Auth } from '../Auth';
import { Storage } from '../Storage';

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
