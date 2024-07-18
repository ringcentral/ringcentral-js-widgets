import type { CallLogNavigationInfo } from './CallLogNavigationInfo';
import type { CallLogPagingInfo } from './CallLogPagingInfo';
import type { UserCallLogRecord } from './UserCallLogRecord';

export interface UserCallLogResponse {
  /**
   * List of call log records
   * Required
   */
  records: UserCallLogRecord[];
  /**
   * Required
   */
  navigation: CallLogNavigationInfo;
  /**
   * Required
   */
  paging: CallLogPagingInfo;
}
