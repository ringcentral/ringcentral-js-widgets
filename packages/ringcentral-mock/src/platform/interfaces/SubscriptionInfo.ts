import { DisabledFilterInfo } from './DisabledFilterInfo';
import { NotificationDeliveryMode } from './NotificationDeliveryMode';
import { NotificationBlacklistedData } from './NotificationBlacklistedData';

export interface SubscriptionInfo {
  /**
   * Internal identifier of a subscription
   */
  id: string;
  /**
   * Canonical URI of a subscription
   */
  uri: string;
  /**
   * Collection of API resources (message-store/presence/detailed presence) corresponding to events the user is subscribed to
   */
  eventFilters: string[];
  /**
   * Collection of API resources (message-store/presence/detailed presence) corresponding to events the user is not subscribed to due to certain limitations
   */
  disabledFilters: DisabledFilterInfo[];
  /**
   * Subscription expiration datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example 2016-03-10T18:07:52.534Z
   * Format: date-time
   */
  expirationTime: string;
  /**
   * Subscription lifetime in seconds
   */
  expiresIn: number;
  /**
   * Subscription status
   */
  status: 'Active' | 'Suspended' | 'Blacklisted';
  /**
   * Subscription creation datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example 2016-03-10T18:07:52.534Z
   * Format: date-time
   */
  creationTime: string;
  /**
   * Required
   */
  deliveryMode: NotificationDeliveryMode;
  /**
   */
  blacklistedData: NotificationBlacklistedData;
  /**
   * Notifications transportation provider name
   */
  transportType: 'PubNub' | 'WebHook' | 'RC/APNS' | 'RC/GCM';
  /**
   * Name of a certificate. Supported for 'RC/APNS' and 'RC/GCM' transport types
   */
  certificateName: string;
  /**
   * Identifier of a registration. Supported for 'RC/APNS' and 'RC/GCM' transport types
   */
  registrationId: string;
}
