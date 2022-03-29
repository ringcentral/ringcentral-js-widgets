import { Alert } from '../Alert';
import { AppFeatures } from '../AppFeatures';
import { Auth } from '../AuthV2';
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
