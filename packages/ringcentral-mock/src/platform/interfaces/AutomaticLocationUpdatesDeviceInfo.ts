import { AutomaticLocationUpdatesModelInfo } from './AutomaticLocationUpdatesModelInfo';
import { AutomaticLocationUpdatesSiteInfo } from './AutomaticLocationUpdatesSiteInfo';
import { AutomaticLocationUpdatesPhoneLine } from './AutomaticLocationUpdatesPhoneLine';

export interface AutomaticLocationUpdatesDeviceInfo {
  /**
   * Internal identifier of a device
   */
  id: string;
  /**
   * Device type
   * Default: HardPhone
   */
  type: 'HardPhone' | 'SoftPhone' | 'OtherPhone';
  /**
   * Serial number for HardPhone (is returned only when the phone is shipped and provisioned)
   */
  serial: string;
  /**
   * Specifies if Automatic Location Updates feature is enabled
   */
  featureEnabled: boolean;
  /**
   * Device name
   */
  name: string;
  /**
   */
  model: AutomaticLocationUpdatesModelInfo;
  /**
   */
  site: AutomaticLocationUpdatesSiteInfo;
  /**
   * Phone lines information
   */
  phoneLines: AutomaticLocationUpdatesPhoneLine[];
}
