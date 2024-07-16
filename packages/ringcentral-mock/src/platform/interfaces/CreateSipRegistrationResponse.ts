import type { SIPFlagsResponse } from './SIPFlagsResponse';
import type { SIPInfoResponse } from './SIPInfoResponse';
import type { SipRegistrationDeviceInfo } from './SipRegistrationDeviceInfo';

export interface CreateSipRegistrationResponse {
  /**
   */
  device: SipRegistrationDeviceInfo;
  /**
   * SIP settings for device
   * Required
   */
  sipInfo: SIPInfoResponse[];
  /**
   * SIP PSTN settings for device
   */
  sipInfoPstn: SIPInfoResponse[];
  /**
   * Required
   */
  sipFlags: SIPFlagsResponse;
  /**
   */
  sipErrorCodes: string[];
}
