// Information on extension, for which this presence data is returned
export interface GetPresenceExtensionInfo {
  /**
   * Internal identifier of an extension
   * Format: int64
   */
  id: number;
  /**
   * Canonical URI of an extension
   */
  uri: string;
  /**
   * Extension number (usually 3 or 4 digits)
   */
  extensionNumber: string;
}
