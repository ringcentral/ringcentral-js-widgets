import { CallsByCompanyHours } from './CallsByCompanyHours';

export interface PerformanceCallsByCompanyHours {
  /**
   * Required
   */
  valueType: 'Percent' | 'Seconds' | 'Instances';
  /**
   * Required
   */
  values: CallsByCompanyHours;
}
