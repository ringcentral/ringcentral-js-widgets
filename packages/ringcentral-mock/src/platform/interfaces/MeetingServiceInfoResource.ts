import type { DialInNumberResource } from './DialInNumberResource';
import type { MeetingExternalUserInfoResource } from './MeetingExternalUserInfoResource';

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
