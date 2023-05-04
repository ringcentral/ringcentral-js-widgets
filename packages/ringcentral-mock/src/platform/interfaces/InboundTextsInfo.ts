export interface InboundTextsInfo {
  /**
   * Email notification flag
   */
  notifyByEmail: boolean;
  /**
   * SMS notification flag
   */
  notifyBySms: boolean;
  /**
   * List of recipient email addresses for inbound text message notifications. Returned if specified, in both modes (advanced/basic). Applied in advanced mode only
   */
  advancedEmailAddresses: string[];
  /**
   * List of recipient phone numbers for inbound text message notifications. Returned if specified, in both modes (advanced/basic). Applied in advanced mode only
   */
  advancedSmsEmailAddresses: string[];
}
