import { PerformanceCallsTimersResponseOptionsAllCallsDuration } from './PerformanceCallsTimersResponseOptionsAllCallsDuration';
import { PerformanceCallsTimersResponseOptionsCallsDurationByDirection } from './PerformanceCallsTimersResponseOptionsCallsDurationByDirection';
import { PerformanceCallsTimersResponseOptionsCallsDurationByOrigin } from './PerformanceCallsTimersResponseOptionsCallsDurationByOrigin';
import { PerformanceCallsTimersResponseOptionsCallsDurationByResponse } from './PerformanceCallsTimersResponseOptionsCallsDurationByResponse';
import { PerformanceCallsTimersResponseOptionsCallsSegmentsDuration } from './PerformanceCallsTimersResponseOptionsCallsSegmentsDuration';
import { PerformanceCallsTimersResponseOptionsCallsDurationByResult } from './PerformanceCallsTimersResponseOptionsCallsDurationByResult';
import { PerformanceCallsTimersResponseOptionsCallsDurationByCompanyHours } from './PerformanceCallsTimersResponseOptionsCallsDurationByCompanyHours';
import { PerformanceCallsTimersResponseOptionsCallsDurationByQueueSla } from './PerformanceCallsTimersResponseOptionsCallsDurationByQueueSla';
import { PerformanceCallsTimersResponseOptionsCallsDurationByType } from './PerformanceCallsTimersResponseOptionsCallsDurationByType';

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
