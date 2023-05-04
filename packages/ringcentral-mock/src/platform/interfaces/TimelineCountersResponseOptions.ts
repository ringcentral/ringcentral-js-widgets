export interface TimelineCountersResponseOptions {
  /**
   */
  allCalls: boolean;
  /**
   */
  callsByDirection: boolean;
  /**
   */
  callsByOrigin: boolean;
  /**
   */
  callsByResponse: boolean;
  /**
   */
  callsSegments: boolean;
  /**
   */
  callsByResult: boolean;
  /**
   */
  callsByCompanyHours: boolean;
  /**
   * This counter is only applicable to Queues grouping
   */
  callsByQueueSla: boolean;
  /**
   */
  callsByActions: boolean;
  /**
   */
  callsByType: boolean;
}
