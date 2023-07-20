import type { CallsByDirection } from './CallsByDirection';

export interface PerformanceCallsByDirection {
  /**
   * Required
   */
  valueType: 'Percent' | 'Seconds' | 'Instances';
  /**
   * Required
   */
  values: CallsByDirection;
}
