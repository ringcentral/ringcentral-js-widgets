import type { CallActionFilter } from './CallActionFilter';
import type { CallSegmentFilter } from './CallSegmentFilter';
import type { PerformanceCallsFilterByLength } from './PerformanceCallsFilterByLength';
import type { PerformanceCallsFilterTimeSpentByMailbox } from './PerformanceCallsFilterTimeSpentByMailbox';

// Optional filters that limit the scope of calls to be aggregated (joined via AND)
export interface PerformanceCallsFilters {
  /**
   * Specifies whether the call was inbound or outbound relative to the scope specified in grouping object. Not applicable to internal calls with company scope (when grouping is not specified)
   */
  direction: 'Inbound' | 'Outbound';
  /**
   * Specifies whether an external party was present in the initial segment of the call
   */
  origin: 'Internal' | 'External';
  /**
   * Aggregation of calls by first response
   */
  callResponse: 'Answered' | 'NotAnswered' | 'Connected' | 'NotConnected';
  /**
   * Aggregation of calls by the nature of call result (joined via OR)
   */
  callResult: (
    | 'Completed'
    | 'Abandoned'
    | 'Voicemail'
    | 'Unknown'
    | 'Missed'
    | 'Accepted'
  )[];
  /**
   * Aggregation of calls by presence of specific segment (joined via OR)
   */
  callSegments: CallSegmentFilter[];
  /**
   * Aggregation of calls by presence of specific action (joined via OR)
   */
  callActions: CallActionFilter[];
  /**
   * Aggregation of calls by company's business hours or after hours
   */
  companyHours: 'BusinessHours' | 'AfterHours';
  /**
   */
  callDuration: PerformanceCallsFilterByLength;
  /**
   */
  timeSpent: PerformanceCallsFilterTimeSpentByMailbox;
  /**
   * List of extension Ids from which users specified in groupBy received calls, items are joined via OR condition
   */
  callerExtensionIds: string[];
  /**
   * List of extension Ids to which users specified in groupBy placed calls, items are joined via OR condition
   */
  calledExtensionIds: string[];
  /**
   * The direct company numbers the caller called (joined via OR)
   */
  calledNumbers: string[];
  /**
   * This filter allows to get aggregation of calls that were either within or out of queue SLA. Only applicable to Queues grouping
   */
  queueSla: 'InSla' | 'OutSla';
  /**
   * This filter allows to get aggregation of calls based on how the call started from the callee perspective (joined via OR). If the call is outbound relative to the grouping scope, callType is Outbound
   */
  callType: (
    | 'Direct'
    | 'FromQueue'
    | 'ParkRetrieval'
    | 'Transferred'
    | 'Outbound'
  )[];
}
