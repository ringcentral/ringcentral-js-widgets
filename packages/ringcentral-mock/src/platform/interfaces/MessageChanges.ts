export interface MessageChanges {
  /**
   * Message type
   */
  type: 'Voicemail' | 'SMS' | 'Fax' | 'Pager';
  /**
   * The number of new messages. Can be omitted if the value is zero
   */
  newCount: number;
  /**
   * The number of updated messages. Can be omitted if the value is zero
   */
  updatedCount: number;
}
