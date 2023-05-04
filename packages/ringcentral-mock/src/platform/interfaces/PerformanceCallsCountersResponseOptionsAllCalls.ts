export interface PerformanceCallsCountersResponseOptionsAllCalls {
  /**
   */
  aggregationType: 'Sum' | 'Average' | 'Max' | 'Min' | 'Percent';
  /**
   */
  aggregationInterval: 'Hour' | 'Day' | 'Week' | 'Month';
}
