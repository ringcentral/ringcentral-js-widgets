import type { CompanyCallLogRecord } from './CompanyCallLogRecord';
import type { CallLogNavigationInfo } from './CallLogNavigationInfo';
import type { CallLogPagingInfo } from './CallLogPagingInfo';

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
