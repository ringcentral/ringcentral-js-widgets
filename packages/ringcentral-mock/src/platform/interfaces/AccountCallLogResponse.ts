import type { CallLogNavigationInfo } from './CallLogNavigationInfo';
import type { CallLogPagingInfo } from './CallLogPagingInfo';
import type { CompanyCallLogRecord } from './CompanyCallLogRecord';

export interface AccountCallLogResponse {
  /**
   * Link to the list of company call log records
   */
  uri: string;
  /**
   * List of call log records
   */
  records: CompanyCallLogRecord[];
  /**
   */
  navigation: CallLogNavigationInfo;
  /**
   */
  paging: CallLogPagingInfo;
}
