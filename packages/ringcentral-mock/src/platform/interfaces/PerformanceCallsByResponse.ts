import type { CallsByResponse } from './CallsByResponse';

export interface PerformanceCallsByResponse {
  /**
   * Required
   */
  valueType: 'Percent' | 'Seconds' | 'Instances';
  /**
   * Required
   */
  values: CallsByResponse;
}
