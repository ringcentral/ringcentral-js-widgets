import type { ScheduleUserMeetingInfo } from './ScheduleUserMeetingInfo';
import type { TelephonyUserMeetingSettings } from './TelephonyUserMeetingSettings';
import type { UserMeetingRecordingSetting } from './UserMeetingRecordingSetting';

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
