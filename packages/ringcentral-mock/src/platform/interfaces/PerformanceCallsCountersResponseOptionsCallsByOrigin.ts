export interface PerformanceCallsCountersResponseOptionsCallsByOrigin {
  /**
   */
  aggregationType: 'Sum' | 'Average' | 'Max' | 'Min' | 'Percent';
  /**
   */
  aggregationInterval: 'Hour' | 'Day' | 'Week' | 'Month';
}
