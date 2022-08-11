import { UserAnsweringRuleListRecord } from './UserAnsweringRuleListRecord';
import { UserAnsweringRuleListPaging } from './UserAnsweringRuleListPaging';
import { UserAnsweringRuleListNavigation } from './UserAnsweringRuleListNavigation';

export interface UserAnsweringRuleList {
  /**
   * Canonical URI of an answering rule list resource
   * Example: https://platform.devtest.ringcentral.com/restapi/v1.0/account/240913004/extension/240972004/answering-rule?page=1&perPage=100
   */
  uri: string;
  /**
   * List of answering rules
   */
  records: UserAnsweringRuleListRecord[];
  /**
   */
  paging: UserAnsweringRuleListPaging;
  /**
   */
  navigation: UserAnsweringRuleListNavigation;
}
