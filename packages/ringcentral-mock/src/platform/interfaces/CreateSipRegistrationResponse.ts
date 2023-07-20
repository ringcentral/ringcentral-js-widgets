import type { SipRegistrationDeviceInfo } from './SipRegistrationDeviceInfo';
import type { SIPInfoResponse } from './SIPInfoResponse';
import type { SIPFlagsResponse } from './SIPFlagsResponse';

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
