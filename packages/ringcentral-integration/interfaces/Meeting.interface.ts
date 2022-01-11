export interface IMeeting {
  init(): void | Promise<void>;
  initScheduleFor(): void | Promise<void>;
  reload(): void | Promise<void>;
  switchUsePersonalMeetingId(usePersonalMeetingId: boolean): Promise<void>;
  updateScheduleFor(userExtensionId: string | number): Promise<void>;
  getMeeting(meetingId: string): Promise<any>;
  validatePasswordSettings(password: string, isSecret: boolean): boolean;
  meeting: any;
  delegators: any;
  isScheduling: boolean;
  showSaveAsDefault: boolean;
  isPreferencesChanged: boolean;
  enablePersonalMeeting: boolean;
  personalMeeting: any;
  enableScheduleOnBehalf: boolean;
  updateMeeting(
    meetingId: string,
    meeting: any,
    options?: { isAlertSuccess?: boolean },
  ): Promise<any>;
}
