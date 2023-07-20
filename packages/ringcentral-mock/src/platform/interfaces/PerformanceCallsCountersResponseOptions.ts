import type { PerformanceCallsCountersResponseOptionsAllCalls } from './PerformanceCallsCountersResponseOptionsAllCalls';
import type { PerformanceCallsCountersResponseOptionsCallsByDirection } from './PerformanceCallsCountersResponseOptionsCallsByDirection';
import type { PerformanceCallsCountersResponseOptionsCallsByOrigin } from './PerformanceCallsCountersResponseOptionsCallsByOrigin';
import type { PerformanceCallsCountersResponseOptionsCallsByResponse } from './PerformanceCallsCountersResponseOptionsCallsByResponse';
import type { PerformanceCallsCountersResponseOptionsCallsSegments } from './PerformanceCallsCountersResponseOptionsCallsSegments';
import type { PerformanceCallsCountersResponseOptionsCallsByResult } from './PerformanceCallsCountersResponseOptionsCallsByResult';
import type { PerformanceCallsCountersResponseOptionsCallsByCompanyHours } from './PerformanceCallsCountersResponseOptionsCallsByCompanyHours';
import type { PerformanceCallsCountersResponseOptionsCallsByQueueSla } from './PerformanceCallsCountersResponseOptionsCallsByQueueSla';
import type { PerformanceCallsCountersResponseOptionsCallsByActions } from './PerformanceCallsCountersResponseOptionsCallsByActions';
import type { PerformanceCallsCountersResponseOptionsCallsByType } from './PerformanceCallsCountersResponseOptionsCallsByType';

// The formula is defined by `aggregationType` and `aggregationInterval` for every counter individually. If `aggregationType` is `Sum` or `Percent`, `aggregationInterval` is not supported. If `aggregationType` is `Min`, `Max` or `Average`,`aggregationInterval` is required
export interface PerformanceCallsCountersResponseOptions {
  /**
   */
  allCalls: PerformanceCallsCountersResponseOptionsAllCalls;
  /**
   */
  callsByDirection: PerformanceCallsCountersResponseOptionsCallsByDirection;
  /**
   */
  callsByOrigin: PerformanceCallsCountersResponseOptionsCallsByOrigin;
  /**
   */
  callsByResponse: PerformanceCallsCountersResponseOptionsCallsByResponse;
  /**
   */
  callsSegments: PerformanceCallsCountersResponseOptionsCallsSegments;
  /**
   */
  callsByResult: PerformanceCallsCountersResponseOptionsCallsByResult;
  /**
   */
  callsByCompanyHours: PerformanceCallsCountersResponseOptionsCallsByCompanyHours;
  /**
   * This counter is only applicable to Queues grouping
   */
  callsByQueueSla: PerformanceCallsCountersResponseOptionsCallsByQueueSla;
  /**
   */
  callsByActions: PerformanceCallsCountersResponseOptionsCallsByActions;
  /**
   */
  callsByType: PerformanceCallsCountersResponseOptionsCallsByType;
}
