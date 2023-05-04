// For Call Queue extension type only. Please note that legacy 'Department' extension type corresponds to 'Call Queue' extensions in modern RingCentral product terminology
export interface CallQueueExtensionInfo {
  /**
   * Target percentage of calls that must be answered by agents within the service level time threshold
   */
  slaGoal: number;
  /**
   * Period of time in seconds that is considered to be an acceptable service level
   */
  slaThresholdSeconds: number;
  /**
   * If 'True' abandoned calls (hanged up prior to being served) are included into service level calculation
   */
  includeAbandonedCalls: boolean;
  /**
   * Period of time in seconds specifying abandoned calls duration - calls that are shorter will not be included into the calculation of service level.; zero value means that abandoned calls of any duration will be included into calculation
   */
  abandonedThresholdSeconds: number;
}
