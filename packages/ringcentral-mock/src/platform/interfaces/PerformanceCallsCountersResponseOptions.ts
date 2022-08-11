import { PerformanceCallsCountersResponseOptionsAllCalls } from './PerformanceCallsCountersResponseOptionsAllCalls';
import { PerformanceCallsCountersResponseOptionsCallsByDirection } from './PerformanceCallsCountersResponseOptionsCallsByDirection';
import { PerformanceCallsCountersResponseOptionsCallsByOrigin } from './PerformanceCallsCountersResponseOptionsCallsByOrigin';
import { PerformanceCallsCountersResponseOptionsCallsByResponse } from './PerformanceCallsCountersResponseOptionsCallsByResponse';
import { PerformanceCallsCountersResponseOptionsCallsSegments } from './PerformanceCallsCountersResponseOptionsCallsSegments';
import { PerformanceCallsCountersResponseOptionsCallsByResult } from './PerformanceCallsCountersResponseOptionsCallsByResult';
import { PerformanceCallsCountersResponseOptionsCallsByCompanyHours } from './PerformanceCallsCountersResponseOptionsCallsByCompanyHours';
import { PerformanceCallsCountersResponseOptionsCallsByQueueSla } from './PerformanceCallsCountersResponseOptionsCallsByQueueSla';
import { PerformanceCallsCountersResponseOptionsCallsByActions } from './PerformanceCallsCountersResponseOptionsCallsByActions';
import { PerformanceCallsCountersResponseOptionsCallsByType } from './PerformanceCallsCountersResponseOptionsCallsByType';

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
