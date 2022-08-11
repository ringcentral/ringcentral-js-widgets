import { MessageStoreCallerInfoRequest } from './MessageStoreCallerInfoRequest';
import { MessageCountryInfo } from './MessageCountryInfo';

export interface CreateSMSMessage {
  /**
   * Required
   */
  from: MessageStoreCallerInfoRequest;
  /**
   * Message receiver(s) information. The `phoneNumber` value is required
   * Required
   */
  to: MessageStoreCallerInfoRequest[];
  /**
   * Text of a message. Max length is 1000 symbols (2-byte UTF-16 encoded). If a character is encoded in 4 bytes in UTF-16 it is treated as 2 characters, thus restricting the maximum message length to 500 symbols
   * Required
   */
  text: string;
  /**
   */
  country: MessageCountryInfo;
}
