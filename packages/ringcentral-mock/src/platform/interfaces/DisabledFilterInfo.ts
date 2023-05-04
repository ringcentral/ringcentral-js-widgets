export interface DisabledFilterInfo {
  /**
   * Event filter that is disabled for the user
   */
  filter: string;
  /**
   * Reason why the filter is disabled for the user
   */
  reason: string;
  /**
   * Error message
   */
  message: string;
}
