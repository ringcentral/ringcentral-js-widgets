// Infomation on a message returned within the specified batch
export interface MessageListMessageResponse {
  /**
   * Internal identifier of a message
   * Format: int32
   * Example: 1234
   */
  id: number;
  /**
   * Internal identifier of a batch the message was submitted in
   * Example: 12345
   */
  batchId: string;
  /**
   * Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format from which the message is sent
   * Example: 15551234567
   */
  from: string;
  /**
   * Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format to which a message is sent
   * Example: 15551234567
   */
  to: string[];
  /**
   * The time at which the message was created
   * Format: date-time
   */
  creationTime: string;
  /**
   * The time at which the messages was last updated
   * Format: date-time
   */
  lastModifiedTime: string;
  /**
   * Current status of a message
   * Example: Queued
   */
  messageStatus:
    | 'Queued'
    | 'Delivered'
    | 'Sent'
    | 'SendingFailed'
    | 'DeliveryFailed';
  /**
   * Number of segments of a message
   * Format: int32
   * Example: 1
   */
  segmentCount: number;
  /**
   * Text of a message. Returned if the `view` parameter is set to 'Detailed'
   */
  text: string;
  /**
   * Cost of a message
   * Format: double
   * Example: 0.007
   */
  cost: number;
  /**
   * Indicates whether the message was outbound or inbound
   * Example: out
   */
  direction: 'Inbound' | 'Outbound';
  /**
   * The RC error code of the message sending failure reason
   * Example: SMS-RC-503
   */
  errorCode: string;
}
