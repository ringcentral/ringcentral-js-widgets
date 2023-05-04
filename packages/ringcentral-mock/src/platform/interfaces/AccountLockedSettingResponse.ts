import { ScheduleUserMeetingInfo } from './ScheduleUserMeetingInfo';
import { UserMeetingRecordingSetting } from './UserMeetingRecordingSetting';
import { TelephonyLockedSettings } from './TelephonyLockedSettings';

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
