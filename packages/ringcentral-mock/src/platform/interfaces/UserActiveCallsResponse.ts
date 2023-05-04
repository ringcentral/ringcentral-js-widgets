import { UserCallLogRecord } from './UserCallLogRecord';
import { CallLogNavigationInfo } from './CallLogNavigationInfo';
import { CallLogPagingInfo } from './CallLogPagingInfo';

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
