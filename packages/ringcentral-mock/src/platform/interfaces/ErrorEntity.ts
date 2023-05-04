export interface ErrorEntity {
  /**
   * Error code
   */
  errorCode: string;
  /**
   * Error message
   */
  message: string;
  /**
   * Name of invalid parameter
   */
  parameterName: string;
  /**
   * Value of invalid parameter
   */
  parameterValue: string;
}
