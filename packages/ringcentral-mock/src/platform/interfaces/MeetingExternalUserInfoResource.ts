export interface MeetingExternalUserInfoResource {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  userId: string;
  /**
   */
  accountId: string;
  /**
   * Format: int64
   */
  userType: number;
  /**
   */
  userToken: string;
  /**
   */
  hostKey: string;
  /**
   */
  personalMeetingId: string;
  /**
   * Link to the user's personal meeting room, used as an alias for personal meeting URL (with personal meeting ID)
   * Example: https://meetings.ringcentral.com/my/jsmith
   */
  personalLink: string;
  /**
   * Enables using personal meeting ID for instant meetings
   */
  usePmiForInstantMeetings: boolean;
}
