// Returned if *Meetings* feature is switched on
export interface UnifiedPresenceMeeting {
  /**
   * Meeting status calculated from all user`s meetings
   */
  status: 'NoMeeting' | 'InMeeting';
}
