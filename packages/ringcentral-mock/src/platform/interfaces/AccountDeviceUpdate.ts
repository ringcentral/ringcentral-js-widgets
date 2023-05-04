import { EmergencyServiceAddressResourceRequest } from './EmergencyServiceAddressResourceRequest';
import { DeviceEmergencyInfo } from './DeviceEmergencyInfo';
import { DeviceUpdateExtensionInfo } from './DeviceUpdateExtensionInfo';
import { DeviceUpdatePhoneLinesInfo } from './DeviceUpdatePhoneLinesInfo';

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
