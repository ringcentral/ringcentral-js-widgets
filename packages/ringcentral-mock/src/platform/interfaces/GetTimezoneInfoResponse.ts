export interface GetTimezoneInfoResponse {
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
   * Description of a timezone
   */
  description: string;
  /**
   */
  bias: string;
}
