import type { MeetingRecording } from './MeetingRecording';
import type { MeetingRecordingsNavigationInfo } from './MeetingRecordingsNavigationInfo';
import type { MeetingRecordingsPagingInfo } from './MeetingRecordingsPagingInfo';

export interface ListMeetingRecordingsResponse {
  /**
   */
  records: MeetingRecording[];
  /**
   */
  paging: MeetingRecordingsPagingInfo;
  /**
   */
  navigation: MeetingRecordingsNavigationInfo;
}
