import type { ERLLocationInfo } from './ERLLocationInfo';
import type { LocationUpdatesEmergencyAddressInfo } from './LocationUpdatesEmergencyAddressInfo';
import type { SwitchSiteInfo } from './SwitchSiteInfo';

export interface SwitchInfo {
  /**
   * Link to the network switch resource
   */
  uri: string;
  /**
   * Internal identifier of a network switch
   */
  id: string;
  /**
   * Unique identifier of a network switch
   */
  chassisId: string;
  /**
   * Name of a network switch
   */
  name: string;
  /**
   */
  site: SwitchSiteInfo;
  /**
   */
  emergencyAddress: LocationUpdatesEmergencyAddressInfo;
  /**
   * Deprecated. Emergency response location (address) internal identifier. Only one of a pair `emergencyAddress` or `emergencyLocationId` should be specified, otherwise the error is returned
   */
  emergencyLocationId: string;
  /**
   */
  emergencyLocation: ERLLocationInfo;
}
