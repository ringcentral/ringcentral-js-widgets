// Identifier of a call party the call will be forwarded to. Only **one of** these parameters: `phoneNumber`, `voicemail` or `extensionNumber` must be specified, otherwise an error is returned.
export interface ForwardTarget {
  /**
   * Phone number
   */
  phoneNumber: string;
  /**
   * Voicemail owner extension identifier
   */
  voicemail: string;
  /**
   * Number of an extension
   */
  extensionNumber: string;
}
