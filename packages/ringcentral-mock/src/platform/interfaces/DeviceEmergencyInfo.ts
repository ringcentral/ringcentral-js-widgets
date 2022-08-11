import { DeviceEmergencyAddress } from './DeviceEmergencyAddress';
import { DeviceEmergencyLocationInfo } from './DeviceEmergencyLocationInfo';

// Device emergency settings
export interface DeviceEmergencyInfo {
  /**
   */
  address: DeviceEmergencyAddress;
  /**
   */
  location: DeviceEmergencyLocationInfo;
  /**
   * Specifies if emergency address is out of country
   */
  outOfCountry: boolean;
  /**
   * Emergency address status
   */
  addressStatus: 'Valid' | 'Invalid' | 'Provisioning';
  /**
   * Visibility of an emergency response location. If `Private` is set, then location is visible only for the restricted number of users, specified in `owners` array
   */
  visibility: 'Private' | 'Public';
  /**
   * Resulting status of emergency address synchronization. Returned if `syncEmergencyAddress` parameter is set to 'True'
   */
  syncStatus:
    | 'Verified'
    | 'Updated'
    | 'Deleted'
    | 'NotRequired'
    | 'Unsupported'
    | 'Failed';
  /**
   * Ability to register new emergency address for a phone line using devices sharing this line or only main device (line owner)
   */
  addressEditableStatus: 'MainDevice' | 'AnyDevice';
}
