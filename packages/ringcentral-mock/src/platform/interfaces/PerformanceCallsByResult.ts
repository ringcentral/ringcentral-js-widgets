import type { CallsByResult } from './CallsByResult';

export interface PerformanceCallsByResult {
  /**
   * Required
   */
  valueType: 'Percent' | 'Seconds' | 'Instances';
  /**
   * Required
   */
  values: CallsByResult;
}
