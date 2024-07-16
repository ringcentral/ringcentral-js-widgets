import type { PerformanceCallsActions } from './PerformanceCallsActions';
import type { PerformanceCallsByCompanyHours } from './PerformanceCallsByCompanyHours';
import type { PerformanceCallsByDirection } from './PerformanceCallsByDirection';
import type { PerformanceCallsByOrigin } from './PerformanceCallsByOrigin';
import type { PerformanceCallsByQueueSla } from './PerformanceCallsByQueueSla';
import type { PerformanceCallsByResponse } from './PerformanceCallsByResponse';
import type { PerformanceCallsByResult } from './PerformanceCallsByResult';
import type { PerformanceCallsByType } from './PerformanceCallsByType';
import type { PerformanceCallsSegments } from './PerformanceCallsSegments';
import type { PerformanceCallsTotal } from './PerformanceCallsTotal';

// Call volume data for the specified grouping
export interface PerformanceCallsCounters {
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
  callsActions: PerformanceCallsActions;
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
