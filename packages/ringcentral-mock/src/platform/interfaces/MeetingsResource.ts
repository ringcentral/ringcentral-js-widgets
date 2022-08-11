import { MeetingResponseResource } from './MeetingResponseResource';
import { MeetingsPagingInfo } from './MeetingsPagingInfo';
import { MeetingsNavigationInfo } from './MeetingsNavigationInfo';

export interface MeetingsResource {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  records: MeetingResponseResource[];
  /**
   */
  paging: MeetingsPagingInfo;
  /**
   */
  navigation: MeetingsNavigationInfo;
}
