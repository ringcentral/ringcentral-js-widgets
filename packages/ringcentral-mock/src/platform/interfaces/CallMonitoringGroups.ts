import { CallMonitoringGroup } from './CallMonitoringGroup';
import { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface CallMonitoringGroups {
  /**
   * Link to a call monitoring groups resource
   * Required
   */
  uri: string;
  /**
   * List of call monitoring group members
   * Required
   */
  records: CallMonitoringGroup[];
  /**
   * Required
   */
  navigation: ProvisioningNavigationInfo;
  /**
   * Required
   */
  paging: ProvisioningPagingInfo;
}
