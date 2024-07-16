import type { DeviceEmergencyInfo } from './DeviceEmergencyInfo';
import type { DeviceUpdateExtensionInfo } from './DeviceUpdateExtensionInfo';
import type { DeviceUpdatePhoneLinesInfo } from './DeviceUpdatePhoneLinesInfo';
import type { EmergencyServiceAddressResourceRequest } from './EmergencyServiceAddressResourceRequest';

export interface AccountDeviceUpdate {
  /**
   */
  emergencyServiceAddress: EmergencyServiceAddressResourceRequest;
  /**
   */
  emergency: DeviceEmergencyInfo;
  /**
   */
  extension: DeviceUpdateExtensionInfo;
  /**
   */
  phoneLines: DeviceUpdatePhoneLinesInfo;
  /**
   * Supported only for devices assigned to Limited extensions. If true, enables users to log in to this phone as a common phone.
   */
  useAsCommonPhone: boolean;
  /**
   * Device label, maximum number of symbols is 64
   */
  name: string;
}
