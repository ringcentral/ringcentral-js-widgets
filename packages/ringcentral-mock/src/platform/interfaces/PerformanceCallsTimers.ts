import type { PerformanceCallsTotal } from './PerformanceCallsTotal';
import type { PerformanceCallsByDirection } from './PerformanceCallsByDirection';
import type { PerformanceCallsByOrigin } from './PerformanceCallsByOrigin';
import type { PerformanceCallsByResponse } from './PerformanceCallsByResponse';
import type { PerformanceCallsSegments } from './PerformanceCallsSegments';
import type { PerformanceCallsByResult } from './PerformanceCallsByResult';
import type { PerformanceCallsByCompanyHours } from './PerformanceCallsByCompanyHours';
import type { PerformanceCallsByQueueSla } from './PerformanceCallsByQueueSla';
import type { PerformanceCallsByType } from './PerformanceCallsByType';

// Call length data for the specified grouping
export interface PerformanceCallsTimers {
  /**
   */
  allCalls: PerformanceCallsTotal;
  /**
   */
  callsByDirection: PerformanceCallsByDirection;
  /**
   */
  callsByOrigin: PerformanceCallsByOrigin;
  /**
   */
  callsByResponse: PerformanceCallsByResponse;
  /**
   */
  callsSegments: PerformanceCallsSegments;
  /**
   */
  callsByResult: PerformanceCallsByResult;
  /**
   */
  callsByCompanyHours: PerformanceCallsByCompanyHours;
  /**
   */
  callsByQueueSla: PerformanceCallsByQueueSla;
  /**
   */
  callsByType: PerformanceCallsByType;
}
