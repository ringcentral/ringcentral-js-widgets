import type { SwitchSiteInfo } from './SwitchSiteInfo';
import type { LocationUpdatesEmergencyAddressInfoRequest } from './LocationUpdatesEmergencyAddressInfoRequest';
import type { ERLLocationInfo } from './ERLLocationInfo';

export interface CreateSwitchInfo {
  /**
   * Unique identifier of a network switch. The supported formats are: XX:XX:XX:XX:XX:XX (symbols 0-9 and A-F) for MAC address and X.X.X.X for IP address (symbols 0-255)
   * Required
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
  emergencyAddress: LocationUpdatesEmergencyAddressInfoRequest;
  /**
   * Deprecated. Emergency response location (address) internal identifier. Only one of a pair `emergencyAddress` or `emergencyLocationId` should be specified, otherwise the error is returned
   */
  emergencyLocationId: string;
  /**
   */
  emergencyLocation: ERLLocationInfo;
}
