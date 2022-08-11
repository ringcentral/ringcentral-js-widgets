import { CompanyAnsweringRuleTimeIntervalRequest } from './CompanyAnsweringRuleTimeIntervalRequest';

// Weekly schedule. If specified, ranges cannot be specified
export interface CompanyAnsweringRuleWeeklyScheduleInfoRequest {
  /**
   * Time interval for a particular day
   */
  monday: CompanyAnsweringRuleTimeIntervalRequest[];
  /**
   * Time interval for a particular day
   */
  tuesday: CompanyAnsweringRuleTimeIntervalRequest[];
  /**
   * Time interval for a particular day
   */
  wednesday: CompanyAnsweringRuleTimeIntervalRequest[];
  /**
   * Time interval for a particular day
   */
  thursday: CompanyAnsweringRuleTimeIntervalRequest[];
  /**
   * Time interval for a particular day
   */
  friday: CompanyAnsweringRuleTimeIntervalRequest[];
  /**
   * Time interval for a particular day
   */
  saturday: CompanyAnsweringRuleTimeIntervalRequest[];
  /**
   * Time interval for a particular day
   */
  sunday: CompanyAnsweringRuleTimeIntervalRequest[];
}
