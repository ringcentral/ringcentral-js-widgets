import { CallQueueMemberInfo } from './CallQueueMemberInfo';
import { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface CallQueueMembers {
  /**
   * Link to a call queue members resource
   * Required
   */
  uri: string;
  /**
   * List of call queue members
   * Required
   */
  records: CallQueueMemberInfo[];
  /**
   * Required
   */
  navigation: ProvisioningNavigationInfo;
  /**
   * Required
   */
  paging: ProvisioningPagingInfo;
}
