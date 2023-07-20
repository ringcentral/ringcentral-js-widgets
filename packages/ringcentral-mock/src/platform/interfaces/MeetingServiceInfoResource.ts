import type { MeetingExternalUserInfoResource } from './MeetingExternalUserInfoResource';
import type { DialInNumberResource } from './DialInNumberResource';

export interface MeetingServiceInfoResource {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  supportUri: string;
  /**
   */
  intlDialInNumbersUri: string;
  /**
   */
  externalUserInfo: MeetingExternalUserInfoResource;
  /**
   */
  dialInNumbers: DialInNumberResource[];
}
