import { MeetingScheduleResource } from './MeetingScheduleResource';
import { HostInfoRequest } from './HostInfoRequest';
import { RecurrenceInfo } from './RecurrenceInfo';

export interface MeetingRequestResource {
  /**
   * Custom topic of a meeting
   */
  topic: string;
  /**
   */
  meetingType: 'Instant' | 'Scheduled' | 'ScheduledRecurring' | 'Recurring';
  /**
   */
  schedule: MeetingScheduleResource;
  /**
   * Meeting password
   */
  password: string;
  /**
   */
  host: HostInfoRequest;
  /**
   */
  allowJoinBeforeHost: boolean;
  /**
   */
  startHostVideo: boolean;
  /**
   * Starting meetings with participant video on/off (true/false)
   */
  startParticipantsVideo: boolean;
  /**
   * If true, then personal user's meeting ID is applied for creation of this meeting
   */
  usePersonalMeetingId: boolean;
  /**
   */
  audioOptions: ('Phone' | 'ComputerAudio')[];
  /**
   */
  recurrence: RecurrenceInfo;
  /**
   * Automatic record type
   * Default: none
   */
  autoRecordType: 'local' | 'cloud' | 'none';
  /**
   * If true, then only signed-in users can join this meeting
   */
  enforceLogin: boolean;
  /**
   * If true, then participants are muted on entry
   */
  muteParticipantsOnEntry: boolean;
  /**
   * If true, then the waiting room for participants is enabled
   */
  enableWaitingRoom: boolean;
  /**
   * List of global dial-in countries (eg. US, UK, AU, etc.)
   */
  globalDialInCountries: string[];
}
