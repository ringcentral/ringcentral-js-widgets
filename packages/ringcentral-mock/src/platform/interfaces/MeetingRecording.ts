import type { MeetingInfo } from './MeetingInfo';
import type { MeetingRecordingInfo } from './MeetingRecordingInfo';

export interface MeetingRecording {
  /**
   */
  meeting: MeetingInfo;
  /**
   */
  recording: MeetingRecordingInfo[];
}
