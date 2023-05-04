// Primary call session information. Supported for Call Queues only
export interface PrimaryCQInfo {
  /**
   * Call information to be displayed as 'Line 1' for a call queue call session
   */
  type:
    | 'PhoneNumberLabel'
    | 'PhoneNumber'
    | 'QueueExtension'
    | 'QueueName'
    | 'CallerIdName'
    | 'CallerIdNumber'
    | 'None';
  /**
   * Call information value
   */
  value: string;
}
