import { TemplateInfo } from './TemplateInfo';
import { ProvisioningNavigationInfo } from './ProvisioningNavigationInfo';
import { ProvisioningPagingInfo } from './ProvisioningPagingInfo';

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
