import { Storage } from '../StorageV2';
import { Auth } from '../AuthV2';
import { Alert } from '../AlertV2';
import { RolesAndPermissions } from '../RolesAndPermissionsV2';

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
  rolesAndPermissions: RolesAndPermissions;
  audioSettingsOptions?: AudioSettingsOptions;
}
