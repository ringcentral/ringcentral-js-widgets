import type { MeetingResponseResource } from './MeetingResponseResource';
import type { MeetingsNavigationInfo } from './MeetingsNavigationInfo';
import type { MeetingsPagingInfo } from './MeetingsPagingInfo';

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
