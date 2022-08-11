import { MeetingsTimezoneResource } from './MeetingsTimezoneResource';

// Timing of a meeting
export interface MeetingScheduleResource {
  /**
   */
  startTime: string;
  /**
   * Format: int32
   */
  durationInMinutes: number;
  /**
   */
  timeZone: MeetingsTimezoneResource;
}
