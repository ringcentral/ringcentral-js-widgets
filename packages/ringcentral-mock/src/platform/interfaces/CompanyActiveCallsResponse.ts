import type { CompanyCallLogRecord } from './CompanyCallLogRecord';
import type { CallLogNavigationInfo } from './CallLogNavigationInfo';
import type { CallLogPagingInfo } from './CallLogPagingInfo';

export interface CompanyActiveCallsResponse {
  /**
   * Link to the list of company active call records
   */
  uri: string;
  /**
   * List of call log records
   * Required
   */
  records: CompanyCallLogRecord[];
  /**
   * Required
   */
  navigation: CallLogNavigationInfo;
  /**
   * Required
   */
  paging: CallLogPagingInfo;
}
