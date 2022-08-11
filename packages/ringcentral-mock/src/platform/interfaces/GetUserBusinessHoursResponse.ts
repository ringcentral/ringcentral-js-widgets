import { ScheduleInfoUserBusinessHours } from './ScheduleInfoUserBusinessHours';

export interface GetUserBusinessHoursResponse {
  /**
   * Canonical URI of a business-hours resource
   */
  uri: string;
  /**
   */
  schedule: ScheduleInfoUserBusinessHours;
}
