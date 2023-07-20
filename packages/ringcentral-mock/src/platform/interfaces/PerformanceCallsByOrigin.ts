import type { CallsByOrigin } from './CallsByOrigin';

export interface PerformanceCallsByOrigin {
  /**
   * Required
   */
  valueType: 'Percent' | 'Seconds' | 'Instances';
  /**
   * Required
   */
  values: CallsByOrigin;
}
