import { MeetingRecording } from './MeetingRecording';
import { MeetingRecordingsPagingInfo } from './MeetingRecordingsPagingInfo';
import { MeetingRecordingsNavigationInfo } from './MeetingRecordingsNavigationInfo';

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
