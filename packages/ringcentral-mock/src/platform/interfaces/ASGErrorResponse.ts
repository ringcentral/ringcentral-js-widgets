// Error response
export interface ASGErrorResponse {
  /**
   * Error code
   */
  errorCode: string;
  /**
   * Human-readable description of an error. Not suitable for end users
   * Example: AccountId 1234 is invalid
   */
  description: string;
}
