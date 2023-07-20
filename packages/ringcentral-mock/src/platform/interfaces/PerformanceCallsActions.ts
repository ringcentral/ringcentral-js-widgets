import type { CallsActions } from './CallsActions';

export interface PerformanceCallsActions {
  /**
   * Required
   */
  valueType: 'Percent' | 'Seconds' | 'Instances';
  /**
   * Required
   */
  values: CallsActions;
}
