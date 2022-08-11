// Call queue service level settings
export interface CallQueueServiceLevelSettings {
  /**
   * Target percentage of calls that must be answered by agents within the service level time threshold
   */
  slaGoal: number;
  /**
   * The period of time in seconds that is considered to be an acceptable service level
   */
  slaThresholdSeconds: number;
  /**
   * Includes abandoned calls (when callers hang up prior to being served by an agent) into service-level calculation
   */
  includeAbandonedCalls: boolean;
  /**
   * Abandoned calls that are shorter than the defined period of time in seconds will not be included into the calculation of Service Level
   */
  abandonedThresholdSeconds: number;
}
