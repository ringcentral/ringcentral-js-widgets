// Represents a failure of adding opt-out / opt-in. A pair of a recipient phone number and an error message
export interface OptOutBulkAssignFailedEntry {
  /**
   * A recipient phone number
   * Example: 15551237756
   */
  to: string;
  /**
   * An error happened on adding opt-out / opt-in
   * Example: Unexpected issue on creating an opt-out from bulk-assign request
   */
  errorMessage: string;
}
