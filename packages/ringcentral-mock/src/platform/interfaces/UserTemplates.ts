import type { TemplateInfo } from './TemplateInfo';
import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

export interface UserTemplates {
  /**
   * Link to user templates resource
   */
  uri: string;
  /**
   * List of user templates
   * Required
   */
  records: TemplateInfo[];
  /**
   * Required
   */
  navigation: ProvisioningNavigationInfo;
  /**
   * Required
   */
  paging: ProvisioningPagingInfo;
}
