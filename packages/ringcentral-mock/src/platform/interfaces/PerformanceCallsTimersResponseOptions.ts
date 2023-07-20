import type { PerformanceCallsTimersResponseOptionsAllCallsDuration } from './PerformanceCallsTimersResponseOptionsAllCallsDuration';
import type { PerformanceCallsTimersResponseOptionsCallsDurationByDirection } from './PerformanceCallsTimersResponseOptionsCallsDurationByDirection';
import type { PerformanceCallsTimersResponseOptionsCallsDurationByOrigin } from './PerformanceCallsTimersResponseOptionsCallsDurationByOrigin';
import type { PerformanceCallsTimersResponseOptionsCallsDurationByResponse } from './PerformanceCallsTimersResponseOptionsCallsDurationByResponse';
import type { PerformanceCallsTimersResponseOptionsCallsSegmentsDuration } from './PerformanceCallsTimersResponseOptionsCallsSegmentsDuration';
import type { PerformanceCallsTimersResponseOptionsCallsDurationByResult } from './PerformanceCallsTimersResponseOptionsCallsDurationByResult';
import type { PerformanceCallsTimersResponseOptionsCallsDurationByCompanyHours } from './PerformanceCallsTimersResponseOptionsCallsDurationByCompanyHours';
import type { PerformanceCallsTimersResponseOptionsCallsDurationByQueueSla } from './PerformanceCallsTimersResponseOptionsCallsDurationByQueueSla';
import type { PerformanceCallsTimersResponseOptionsCallsDurationByType } from './PerformanceCallsTimersResponseOptionsCallsDurationByType';

// The formula is defined by `aggregationType` and `aggregationInterval` for every timer individually. If `aggregationType` is `Sum` or `Percent`, `aggregationInterval` is not supported. If `aggregationType` is `Min`, `Max` or `Average`,`aggregationInterval` is supported, but not required. If left empty, aggregation will be performed on per-call basis
export interface PerformanceCallsTimersResponseOptions {
  /**
   */
  allCallsDuration: PerformanceCallsTimersResponseOptionsAllCallsDuration;
  /**
   */
  callsDurationByDirection: PerformanceCallsTimersResponseOptionsCallsDurationByDirection;
  /**
   */
  callsDurationByOrigin: PerformanceCallsTimersResponseOptionsCallsDurationByOrigin;
  /**
   */
  callsDurationByResponse: PerformanceCallsTimersResponseOptionsCallsDurationByResponse;
  /**
   */
  callsSegmentsDuration: PerformanceCallsTimersResponseOptionsCallsSegmentsDuration;
  /**
   */
  callsDurationByResult: PerformanceCallsTimersResponseOptionsCallsDurationByResult;
  /**
   */
  callsDurationByCompanyHours: PerformanceCallsTimersResponseOptionsCallsDurationByCompanyHours;
  /**
   * This timer is only applicable to Queues grouping
   */
  callsDurationByQueueSla: PerformanceCallsTimersResponseOptionsCallsDurationByQueueSla;
  /**
   */
  callsDurationByType: PerformanceCallsTimersResponseOptionsCallsDurationByType;
}
