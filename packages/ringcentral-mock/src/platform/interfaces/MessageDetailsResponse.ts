// Detailed information on a message
export interface MessageDetailsResponse {
  /**
   * Internal identifier of a message
   * Example: 1234
   */
  id: string;
  /**
   * Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format from which the message was sent
   * Example: 15551234567
   */
  from: string;
  /**
   * List of phone numbers in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format to which the message was sent
   * Example: 15551234567
   */
  to: string[];
  /**
   * Text of a message, maximum number of characters is 1000
   * Example: Hello, World!
   */
  text: string;
  /**
   * The time when this is message was created.
   * Format: date-time
   */
  creationTime: string;
  /**
   * The time when this message was last updated.
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
   * Cost of a message
   * Format: double
   * Example: 0.007
   */
  cost: number;
  /**
   * The batch in which the message was submitted
   * Example: batch12345
   */
  batchId: string;
  /**
   * Indicates whether the message is outbound or inbound
   * Example: out
   */
  direction: 'Inbound' | 'Outbound';
  /**
   * RC error code of the message sending failure reason
   * Example: SMS-RC-503
   */
  errorCode: string;
}
