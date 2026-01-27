export interface AudioSettingsData {
  ringtoneVolume: number;
  callVolume: number;
  ringtoneDeviceId: string;
  outputDeviceId: string;
  outputDeviceLabel: string | null;
  inputDeviceId: string;
  inputDeviceLabel: string | null;
  hasAutoPrompted: boolean;
  isAGCEnabled: boolean;
}

export interface AudioSettingsOptions {
  /**
   * in spring-ui always be true
   *
   * TODO: should remove after all projects migrate to spring-ui
   */
  showCheckMediaAlert?: boolean;
}
