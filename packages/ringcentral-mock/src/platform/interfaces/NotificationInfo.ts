import type { AlertInfo } from './AlertInfo';

// Information on a notification
export interface NotificationInfo {
  /**
   */
  alert: AlertInfo;
  /**
   * Number of incoming messages
   */
  badge: string;
  /**
   * Message sound
   */
  sound: string;
  /**
   * Content availability
   */
  'content-available': string;
  /**
   * Category of a message
   */
  category: string;
}
