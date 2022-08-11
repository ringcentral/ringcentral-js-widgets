import { CallsByType } from './CallsByType';

export interface PerformanceCallsByType {
  /**
   * Required
   */
  valueType: 'Percent' | 'Seconds' | 'Instances';
  /**
   * Required
   */
  values: CallsByType;
}
