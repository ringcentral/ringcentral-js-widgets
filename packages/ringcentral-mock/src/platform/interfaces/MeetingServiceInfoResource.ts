import { MeetingExternalUserInfoResource } from './MeetingExternalUserInfoResource';
import { DialInNumberResource } from './DialInNumberResource';

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
