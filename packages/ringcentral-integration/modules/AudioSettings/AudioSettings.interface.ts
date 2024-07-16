import type { Alert } from '../Alert';
import type { AppFeatures } from '../AppFeatures';
import type { Auth } from '../Auth';
import type { Storage } from '../Storage';

export interface AudioSettingsData {
  ringtoneVolume: number;
  callVolume: number;
  outputDeviceId: string;
  inputDeviceId: string;
  ringtoneDeviceId: string;
  hasAutoPrompted: boolean;
  isAGCEnabled: boolean;
}

export interface AudioSettingsOptions {
  showCheckMediaAlert?: boolean;
}

export interface Deps {
  auth: Auth;
  alert: Alert;
  storage: Storage;
  appFeatures: AppFeatures;
  audioSettingsOptions?: AudioSettingsOptions;
}
