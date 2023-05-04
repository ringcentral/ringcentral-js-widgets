import { CompanyAnsweringRuleWeeklyScheduleInfoRequest } from './CompanyAnsweringRuleWeeklyScheduleInfoRequest';
import { RangesInfo } from './RangesInfo';

// Schedule when an answering rule should be applied
export interface CompanyAnsweringRuleScheduleInfo {
  /**
   */
  weeklyRanges: CompanyAnsweringRuleWeeklyScheduleInfoRequest;
  /**
   * Specific data ranges. If specified, weeklyRanges cannot be specified
   */
  ranges: RangesInfo[];
  /**
   * Reference to Business Hours or After Hours schedule = ['BusinessHours', 'AfterHours']
   */
  ref: 'BusinessHours' | 'AfterHours';
}
