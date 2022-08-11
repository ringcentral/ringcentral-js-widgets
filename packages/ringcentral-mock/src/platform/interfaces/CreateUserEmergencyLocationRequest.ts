import { LocationUpdatesEmergencyAddressInfoRequest } from './LocationUpdatesEmergencyAddressInfoRequest';

export interface CreateUserEmergencyLocationRequest {
  /**
   * Name of a new personal emergency response location
   */
  name: string;
  /**
   */
  address: LocationUpdatesEmergencyAddressInfoRequest;
}
