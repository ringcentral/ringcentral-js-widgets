import { GlipAPNSInfo } from './GlipAPNSInfo';
import { GCMInfo } from './GCMInfo';

export interface GlipUnreadMessageCountEvent {
  /**
   * Universally unique identifier of a notification
   */
  uuid: string;
  /**
   */
  pn_apns: GlipAPNSInfo;
  /**
   */
  pn_gcm: GCMInfo;
  /**
   * Internal identifier of a subscription owner extension
   */
  ownerId: string;
}
