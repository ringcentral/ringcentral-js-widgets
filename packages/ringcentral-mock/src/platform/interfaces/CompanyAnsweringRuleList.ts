import { ListCompanyAnsweringRuleInfo } from './ListCompanyAnsweringRuleInfo';
import { CallHandlingPagingInfo } from './CallHandlingPagingInfo';
import { CallHandlingNavigationInfo } from './CallHandlingNavigationInfo';

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
