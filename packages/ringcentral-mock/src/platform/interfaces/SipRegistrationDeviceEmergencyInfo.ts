import type { DeviceEmergencyServiceAddressResource } from './DeviceEmergencyServiceAddressResource';
import type { SipRegistrationDeviceLocationInfo } from './SipRegistrationDeviceLocationInfo';

// Emergency response location settings of a device
export interface SipRegistrationDeviceEmergencyInfo {
  /**
   */
  address: DeviceEmergencyServiceAddressResource;
  /**
   */
  location: SipRegistrationDeviceLocationInfo;
  /**
   * Specifies if emergency address is out of country
   */
  outOfCountry: boolean;
  /**
   * Emergency address status
   */
  addressStatus: 'Valid' | 'Invalid' | 'Processing';
  /**
   * Specifies whether to return only private or only public (company) ERLs (Emergency Response Locations)
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
  /**
   * 'True' if emergency address is required for the country of a phone line
   */
  addressRequired: boolean;
  /**
   * 'True' if out of country emergency address is not allowed for the country of a phone line
   */
  addressLocationOnly: boolean;
}
