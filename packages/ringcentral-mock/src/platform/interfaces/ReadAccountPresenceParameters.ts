// Query parameters for operation readAccountPresence
export interface ReadAccountPresenceParameters {
  /**
   * Whether to return detailed telephony state
   */
  detailedTelephonyState: boolean;
  /**
   * Whether to return SIP data
   */
  sipData: boolean;
  /**
   * Page number for account presence information
   * Format: int32
   */
  page: number;
  /**
   * Number for account presence information items per page
   * Format: int32
   */
  perPage: number;
}
