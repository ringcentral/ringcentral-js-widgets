import { DeviceInfoRequest } from './DeviceInfoRequest';
import { SIPInfoRequest } from './SIPInfoRequest';

export interface CreateSipRegistrationRequest {
  /**
   */
  device: DeviceInfoRequest;
  /**
   * SIP settings for device
   */
  sipInfo: SIPInfoRequest[];
}
