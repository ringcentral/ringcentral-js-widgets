import type { CallHandlingNavigationInfo } from './CallHandlingNavigationInfo';
import type { CallHandlingPagingInfo } from './CallHandlingPagingInfo';
import type { ListCompanyAnsweringRuleInfo } from './ListCompanyAnsweringRuleInfo';

export interface CompanyAnsweringRuleList {
  /**
   * Link to an answering rule resource
   */
  uri: string;
  /**
   * List of company answering rules
   */
  records: ListCompanyAnsweringRuleInfo[];
  /**
   */
  paging: CallHandlingPagingInfo;
  /**
   */
  navigation: CallHandlingNavigationInfo;
}
