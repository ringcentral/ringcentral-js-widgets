import { PerformanceCallsTotal } from './PerformanceCallsTotal';
import { PerformanceCallsByDirection } from './PerformanceCallsByDirection';
import { PerformanceCallsByOrigin } from './PerformanceCallsByOrigin';
import { PerformanceCallsByResponse } from './PerformanceCallsByResponse';
import { PerformanceCallsSegments } from './PerformanceCallsSegments';
import { PerformanceCallsByResult } from './PerformanceCallsByResult';
import { PerformanceCallsActions } from './PerformanceCallsActions';
import { PerformanceCallsByCompanyHours } from './PerformanceCallsByCompanyHours';
import { PerformanceCallsByQueueSla } from './PerformanceCallsByQueueSla';
import { PerformanceCallsByType } from './PerformanceCallsByType';

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
