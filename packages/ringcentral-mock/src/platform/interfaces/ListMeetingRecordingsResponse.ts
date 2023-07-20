import type { MeetingRecording } from './MeetingRecording';
import type { MeetingRecordingsPagingInfo } from './MeetingRecordingsPagingInfo';
import type { MeetingRecordingsNavigationInfo } from './MeetingRecordingsNavigationInfo';

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
