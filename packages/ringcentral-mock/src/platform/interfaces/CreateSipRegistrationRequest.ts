import type { DeviceInfoRequest } from './DeviceInfoRequest';
import type { SIPInfoRequest } from './SIPInfoRequest';

export interface CreateSipRegistrationRequest {
  /**
   */
  device: DeviceInfoRequest;
  /**
   * SIP settings for device
   */
  sipInfo: SIPInfoRequest[];
}
