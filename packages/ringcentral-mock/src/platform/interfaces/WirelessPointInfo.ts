import type { AutomaticLocationUpdatesSiteInfo } from './AutomaticLocationUpdatesSiteInfo';
import type { ERLLocationInfo } from './ERLLocationInfo';
import type { LocationUpdatesEmergencyAddressInfo } from './LocationUpdatesEmergencyAddressInfo';

export interface WirelessPointInfo {
  /**
   * Link to the wireless point resource
   */
  uri: string;
  /**
   * Internal identifier of a wireless point
   */
  id: string;
  /**
   * Unique 48-bit identifier of the wireless access point complying with MAC address conventions
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
  emergencyAddress: LocationUpdatesEmergencyAddressInfo;
  /**
   */
  emergencyLocation: ERLLocationInfo;
  /**
   * Deprecated. Emergency response location (address) internal identifier. Only one of a pair `emergencyAddress` or `emergencyLocationId` should be specified, otherwise the error is returned
   */
  emergencyLocationId: string;
}
