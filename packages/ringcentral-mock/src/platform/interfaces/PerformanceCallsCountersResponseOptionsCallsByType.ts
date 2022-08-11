export interface PerformanceCallsCountersResponseOptionsCallsByType {
  /**
   */
  aggregationType: 'Sum' | 'Average' | 'Max' | 'Min' | 'Percent';
  /**
   */
  aggregationInterval: 'Hour' | 'Day' | 'Week' | 'Month';
}
