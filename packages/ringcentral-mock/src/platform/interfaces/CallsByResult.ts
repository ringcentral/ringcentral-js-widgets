export interface CallsByResult {
  /**
   * Required
   * Format: double
   */
  completed: number;
  /**
   * Required
   * Format: double
   */
  abandoned: number;
  /**
   * Required
   * Format: double
   */
  voicemail: number;
  /**
   * Required
   * Format: double
   */
  missed: number;
  /**
   * Required
   * Format: double
   */
  accepted: number;
  /**
   * Required
   * Format: double
   */
  unknown: number;
}
