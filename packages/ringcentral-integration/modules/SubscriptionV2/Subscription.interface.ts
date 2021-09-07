import { Auth } from '../AuthV2';
import { SleepDetector } from '../SleepDetectorV2';
import { Storage } from '../StorageV2';

/**
 * Extracted from @rc-ex
 * Most events seem to follow this format.
 */

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

export interface SubscriptionOptions {
  timeToRetry?: number;
  registerDelay?: number;
}

export interface Deps {
  auth: Auth;
  client: any;
  storage: Storage;
  sleepDetector: SleepDetector;
  subscriptionOptions?: SubscriptionOptions;
}
