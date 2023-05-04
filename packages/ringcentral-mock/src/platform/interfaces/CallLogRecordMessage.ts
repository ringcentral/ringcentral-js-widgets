// Linked message (Fax/Voicemail)
export interface CallLogRecordMessage {
  /**
   * Internal identifier of a message
   */
  id: string;
  /**
   * Type of a message
   */
  type: string;
  /**
   * Link to a message resource
   */
  uri: string;
}
