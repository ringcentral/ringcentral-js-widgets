export interface TimelineTimersResponseOptions {
  /**
   */
  allCallsDuration: boolean;
  /**
   */
  callsDurationByDirection: boolean;
  /**
   */
  callsDurationByOrigin: boolean;
  /**
   */
  callsDurationByResponse: boolean;
  /**
   */
  callsSegmentsDuration: boolean;
  /**
   */
  callsDurationByResult: boolean;
  /**
   */
  callsDurationByCompanyHours: boolean;
  /**
   * This timer is only applicable to Queues grouping
   */
  callsDurationByQueueSla: boolean;
  /**
   */
  callsDurationByType: boolean;
}
