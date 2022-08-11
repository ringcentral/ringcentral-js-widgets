export interface CallsByType {
  /**
   * Required
   * Format: double
   */
  direct: number;
  /**
   * Required
   * Format: double
   */
  fromQueue: number;
  /**
   * Required
   * Format: double
   */
  parkRetrieval: number;
  /**
   * Required
   * Format: double
   */
  transferred: number;
  /**
   * Required
   * Format: double
   */
  outbound: number;
}
