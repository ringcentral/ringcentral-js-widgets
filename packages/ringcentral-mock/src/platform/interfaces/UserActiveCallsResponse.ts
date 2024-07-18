import type { CallLogNavigationInfo } from './CallLogNavigationInfo';
import type { CallLogPagingInfo } from './CallLogPagingInfo';
import type { UserCallLogRecord } from './UserCallLogRecord';

export interface UserActiveCallsResponse {
  /**
   * Link to the list of user active call records
   */
  uri: string;
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
