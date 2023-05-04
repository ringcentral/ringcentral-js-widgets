export interface LocationDeletionErrorInfo {
  /**
   * Error code
   */
  errorCode: string;
  /**
   * Error message
   */
  message: string;
  /**
   * Additional attribute for this error, for example `parameterName`
   */
  additionalInfo: string;
}
