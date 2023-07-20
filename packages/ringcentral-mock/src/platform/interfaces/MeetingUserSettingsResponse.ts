import type { UserMeetingRecordingSetting } from './UserMeetingRecordingSetting';
import type { ScheduleUserMeetingInfo } from './ScheduleUserMeetingInfo';
import type { TelephonyUserMeetingSettings } from './TelephonyUserMeetingSettings';

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
