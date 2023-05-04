// Error response
export interface ErrorResponse {
  /**
   * Error code
   * Example: CMN-101
   */
  errorCode: string;
  /**
   * Human-readable description of the error. Not suitable for end users.
   * Example: AccountId 1234 is invalid
   */
  description: string;
}
