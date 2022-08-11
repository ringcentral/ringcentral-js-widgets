// Message footer information
export interface GlipMessageAttachmentFootnoteInfo {
  /**
   * Text of a footer
   */
  text: string;
  /**
   * Link to an icon displayed to the left of a footer; sized 32x32px
   */
  iconUri: string;
  /**
   * Message creation datetime in ISO 8601 format including timezone, for example *2016-03-10T18:07:52.534Z*
   * Format: date-time
   */
  time: string;
}
