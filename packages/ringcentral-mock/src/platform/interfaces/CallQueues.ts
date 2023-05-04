import { CallQueueInfo } from './CallQueueInfo';
import { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface CallQueues {
  /**
   * Link to a call queues resource
   * Required
   */
  uri: string;
  /**
   * List of call queues
   * Required
   */
  records: CallQueueInfo[];
  /**
   * Required
   */
  navigation: ProvisioningNavigationInfo;
  /**
   * Required
   */
  paging: ProvisioningPagingInfo;
}
