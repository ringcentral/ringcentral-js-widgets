import { NotificationDeliveryModeRequest } from './NotificationDeliveryModeRequest';

export interface CreateSubscriptionRequest {
  /**
   * Collection of URIs to API resources
   * Required
   */
  eventFilters: string[];
  /**
   * Required
   */
  deliveryMode: NotificationDeliveryModeRequest;
  /**
   * Subscription lifetime in seconds. For *WebHook* transport type max value might be set up to 630720000 seconds (20 years). For RC/APNS and RC/GSM transport max subscription lifetime is 7776000 seconds (90 days). For PubNub transport the max value is 900 seconds (15 minutes)
   */
  expiresIn: number;
}
