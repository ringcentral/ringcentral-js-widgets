import type { SubscriptionFilter } from '@ringcentral-integration/commons/enums/subscriptionFilters';

export interface MessageBase {
  /**
   * Universally unique identifier of a notification
   */
  uuid?: string;

  /**
   * Event filter URI
   */
  event?: string;

  /**
   * Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z*
   */
  timestamp?: string;

  /**
   * Internal identifier of a subscription
   */
  subscriptionId?: string;

  /**
   * Notification payload body
   */
  body?: any;
}

export interface WebSocketSubscriptionOptions {}

export interface SubscriptionMetadata {
  filters: SubscriptionFilter[];
  handler?: (message: any) => void;
}

export interface SubscriberInfo {
  metadata: SubscriptionMetadata;
  unwatch?: () => void;
}
