import type { ScheduleUserMeetingInfo } from './ScheduleUserMeetingInfo';
import type { UserMeetingRecordingSetting } from './UserMeetingRecordingSetting';
import type { TelephonyLockedSettings } from './TelephonyLockedSettings';

export interface AccountLockedSettingResponse {
  /**
   */
  scheduleMeeting: ScheduleUserMeetingInfo;
  /**
   */
  recording: UserMeetingRecordingSetting;
  /**
   */
  telephony: TelephonyLockedSettings;
}
