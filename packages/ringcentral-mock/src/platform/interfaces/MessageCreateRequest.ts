// Single individual SMS resource
export interface MessageCreateRequest {
  /**
   * List of phone numbers in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format, recipients of this message. Currently only one number is supported
   * Required
   * Example: 15551234567
   */
  to: string[];
  /**
   * Text to send, maximum number of characters is 1000
   * Example: Hello, World!
   */
  text: string;
}
