import { Alert } from '../AlertV2';
import { Auth } from '../AuthV2';
import { AppFeatures } from '../AppFeatures';
import { Storage } from '../StorageV2';

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
