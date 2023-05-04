// Scheduling meeting settings locked on account level || Settings defining how to schedule user meetingsxs
export interface ScheduleUserMeetingInfo {
  /**
   * If true, then only signed-in users can join this meeting
   */
  enforceLogin: boolean;
  /**
   * Starting meetings with host video on/off (true/false)
   */
  startHostVideo: boolean;
  /**
   * Starting meetings with participant video on/off (true/false)
   */
  startParticipantsVideo: boolean;
  /**
   * Determines how participants can join the audio channel of a meeting
   */
  audioOptions: ('Phone' | 'ComputerAudio' | 'ThirdParty')[];
  /**
   * Allows participants to join the meeting before the host arrives
   */
  allowJoinBeforeHost: boolean;
  /**
   * Determines whether to use Personal Meeting ID (PMI) when scheduling a meeting
   */
  usePmiForScheduledMeetings: boolean;
  /**
   * Determines whether to use Personal Meeting ID (PMI) when starting an instant meeting
   */
  usePmiForInstantMeetings: boolean;
  /**
   * A password will be generated when scheduling a meeting and participants will require password to join a meeting. The Personal Meeting ID (PMI) meetings are not included
   */
  requirePasswordForSchedulingNewMeetings: boolean;
  /**
   * Specifies whether to require a password for meetings which have already been scheduled
   */
  requirePasswordForScheduledMeetings: boolean;
  /**
   * Password for already scheduled meetings. Users can set it individually
   */
  defaultPasswordForScheduledMeetings: string;
  /**
   * A random password will be generated for an instant meeting, if set to 'True'. If you use PMI for your instant meetings, this option will be disabled
   */
  requirePasswordForInstantMeetings: boolean;
  /**
   * Specifies whether to require a password for meetings using Personal Meeting ID (PMI). The supported values are: 'none', 'all' and 'jbhOnly' (joined before host only)
   */
  requirePasswordForPmiMeetings: 'all' | 'none' | 'jbhOnly';
  /**
   * The default password for Personal Meeting ID (PMI) meetings
   */
  pmiPassword: string;
  /**
   * Specifies whether to generate and require a password for participants joining by phone
   */
  pstnPasswordProtected: boolean;
}
