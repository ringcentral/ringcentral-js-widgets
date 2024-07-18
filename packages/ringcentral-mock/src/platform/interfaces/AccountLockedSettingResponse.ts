import type { ScheduleUserMeetingInfo } from './ScheduleUserMeetingInfo';
import type { TelephonyLockedSettings } from './TelephonyLockedSettings';
import type { UserMeetingRecordingSetting } from './UserMeetingRecordingSetting';

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
