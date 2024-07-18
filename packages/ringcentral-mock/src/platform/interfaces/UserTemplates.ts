import type { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import type { ProvisioningPagingInfo } from './ProvisioningPagingInfo';
import type { TemplateInfo } from './TemplateInfo';

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
