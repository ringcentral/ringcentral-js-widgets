import { CallsByQueueSla } from './CallsByQueueSla';

export interface PerformanceCallsByQueueSla {
  /**
   * Required
   */
  valueType: 'Percent' | 'Seconds' | 'Instances';
  /**
   * Required
   */
  values: CallsByQueueSla;
}
