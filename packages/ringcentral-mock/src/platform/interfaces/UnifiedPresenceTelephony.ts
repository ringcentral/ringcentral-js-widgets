// Returned if *BLF* feature is switched on
export interface UnifiedPresenceTelephony {
  /**
   * Telephony status calculated from all user's phone numbers. Returned always for the requester's extension; returned for another users if their telephony visibility is set to 'Visible'
   */
  status: 'NoCall' | 'Ringing' | 'CallConnected' | 'OnHold' | 'ParkedCall';
  /**
   * Specifies if the user hardphone presence status is visible to other users; returned only for requester's extension
   */
  visibility: 'Visible' | 'Invisible';
  /**
   * Telephony DND status. Returned if *DND* feature is switched on
   */
  availability:
    | 'TakeAllCalls'
    | 'DoNotAcceptAnyCalls'
    | 'DoNotAcceptQueueCalls';
}
