export interface BulkSupported {
  /**
   * Format: int32
   */
  maxOperations: number;
  /**
   * Format: int32
   */
  maxPayloadSize: number;
  /**
   */
  supported: boolean;
}
