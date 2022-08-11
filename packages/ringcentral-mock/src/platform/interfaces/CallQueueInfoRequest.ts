// For Call Queue extension type only. Please note that legacy 'Department' extension type corresponds to 'Call Queue' extensions in modern RingCentral product terminology
export interface CallQueueInfoRequest {
  /**
   * Target percentage of calls that must be answered by agents within the service level time threshold
   */
  slaGoal: number;
  /**
   */
  slaThresholdSeconds: number;
  /**
   */
  includeAbandonedCalls: boolean;
  /**
   */
  abandonedThresholdSeconds: number;
}
