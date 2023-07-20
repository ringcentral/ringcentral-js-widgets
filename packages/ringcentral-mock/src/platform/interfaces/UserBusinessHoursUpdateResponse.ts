import type { UserBusinessHoursScheduleInfo } from './UserBusinessHoursScheduleInfo';

export interface UserBusinessHoursUpdateResponse {
  /**
   * Canonical URI of a business-hours resource
   */
  uri: string;
  /**
   */
  schedule: UserBusinessHoursScheduleInfo;
}
