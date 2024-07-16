import type { AutomaticLocationUpdatesSiteInfo } from './AutomaticLocationUpdatesSiteInfo';
import type { ERLLocationInfo } from './ERLLocationInfo';
import type { LocationUpdatesEmergencyAddressInfoRequest } from './LocationUpdatesEmergencyAddressInfoRequest';

export interface UpdateWirelessPoint {
  /**
   * Internal identifier of a wireless point
   */
  id: string;
  /**
   * Unique 48-bit identifier of wireless access point complying with MAC address conventions. Mask: XX:XX:XX:XX:XX:XX, where X can be a symbol in the range of 0-9 or A-F
   */
  bssid: string;
  /**
   * Wireless access point name
   */
  name: string;
  /**
   */
  site: AutomaticLocationUpdatesSiteInfo;
  /**
   */
  emergencyAddress: LocationUpdatesEmergencyAddressInfoRequest;
  /**
   * Deprecated. Internal identifier of the emergency response location (address). Only one of a pair `emergencyAddress` or `emergencyLocationId` should be specified, otherwise the error is returned
   */
  emergencyLocationId: string;
  /**
   */
  emergencyLocation: ERLLocationInfo;
}
