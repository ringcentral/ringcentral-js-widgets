import { CompanyCallLogRecord } from './CompanyCallLogRecord';
import { CallLogNavigationInfo } from './CallLogNavigationInfo';
import { CallLogPagingInfo } from './CallLogPagingInfo';

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
