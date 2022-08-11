// Additional call session information. Supported for Call Queues only
export interface AdditionalCQInfo {
  /**
   * Call information to be displayed as 'Line 2' for a call queue call session
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
