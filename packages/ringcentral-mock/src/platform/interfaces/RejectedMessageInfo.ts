// Information about the message that failed to be sent
export interface RejectedMessageInfo {
  /**
   * Index of the rejected message in the request
   * Format: int32
   * Example: 2
   */
  index: number;
  /**
   */
  to: string[];
  /**
   * Standard error code
   * Example: CMN-100
   */
  errorCode: string;
  /**
   * Standard error description
   * Example: Parameter [to] value is invalid
   */
  description: string;
}
