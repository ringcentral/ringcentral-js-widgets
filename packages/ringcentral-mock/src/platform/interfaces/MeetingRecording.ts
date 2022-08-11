import { MeetingInfo } from './MeetingInfo';
import { MeetingRecordingInfo } from './MeetingRecordingInfo';

export interface MeetingRecording {
  /**
   */
  meeting: MeetingInfo;
  /**
   */
  recording: MeetingRecordingInfo[];
}
