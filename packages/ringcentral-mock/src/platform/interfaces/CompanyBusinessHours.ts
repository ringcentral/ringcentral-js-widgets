import { CompanyBusinessHoursScheduleInfo } from './CompanyBusinessHoursScheduleInfo';

export interface CompanyBusinessHours {
  /**
   * Canonical URI of a business-hours resource
   */
  uri: string;
  /**
   */
  schedule: CompanyBusinessHoursScheduleInfo;
}
