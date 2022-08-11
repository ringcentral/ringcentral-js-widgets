import { UserMeetingRecordingSetting } from './UserMeetingRecordingSetting';
import { ScheduleUserMeetingInfo } from './ScheduleUserMeetingInfo';
import { TelephonyUserMeetingSettings } from './TelephonyUserMeetingSettings';

export interface MeetingUserSettingsResponse {
  /**
   */
  recording: UserMeetingRecordingSetting;
  /**
   */
  scheduleMeeting: ScheduleUserMeetingInfo;
  /**
   */
  telephony: TelephonyUserMeetingSettings;
}
