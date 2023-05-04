import { SubscriptionInfo } from './SubscriptionInfo';

export interface RecordsCollectionResourceSubscriptionResponse {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  records: SubscriptionInfo[];
}
