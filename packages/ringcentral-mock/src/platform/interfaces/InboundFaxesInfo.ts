export interface InboundFaxesInfo {
  /**
   * Email notification flag
   */
  notifyByEmail: boolean;
  /**
   * SMS notification flag
   */
  notifyBySms: boolean;
  /**
   * List of recipient email addresses for inbound fax notifications. Returned if specified, in both modes (advanced/basic). Applied in advanced mode only
   */
  advancedEmailAddresses: string[];
  /**
   * List of recipient phone numbers for inbound fax notifications. Returned if specified, in both modes (advanced/basic). Applied in advanced mode only
   */
  advancedSmsEmailAddresses: string[];
  /**
   * Indicates whether fax should be attached to email
   */
  includeAttachment: boolean;
  /**
   * Indicates whether email should be automatically marked as read
   */
  markAsRead: boolean;
}
