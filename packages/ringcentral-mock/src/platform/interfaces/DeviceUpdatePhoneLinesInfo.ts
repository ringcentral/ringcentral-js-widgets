import type { UpdateDevicePhoneInfo } from './UpdateDevicePhoneInfo';

// Information on phone lines added to a device
export interface DeviceUpdatePhoneLinesInfo {
  /**
   * Information on phone lines added to a device
   */
  phoneLines: UpdateDevicePhoneInfo[];
}
