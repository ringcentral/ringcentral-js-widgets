// Extension timezone information
export interface TimezoneInfo {
  /**
   * Internal identifier of a timezone
   */
  id: string;
  /**
   * Canonical URI of a timezone
   */
  uri: string;
  /**
   * Short name of a timezone
   */
  name: string;
  /**
   * Meaningful description of the timezone
   */
  description: string;
  /**
   */
  bias: string;
}
