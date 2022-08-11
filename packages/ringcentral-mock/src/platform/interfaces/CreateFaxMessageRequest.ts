import { MessageStoreCalleeInfoRequest } from './MessageStoreCalleeInfoRequest';
import { Attachment } from './Attachment';

// Request body for operation createFaxMessage
export interface CreateFaxMessageRequest {
  /**
   * Resolution of Fax
   */
  faxResolution: 'High' | 'Low';
  /**
   * To Phone Number
   * Required
   */
  to: MessageStoreCalleeInfoRequest[];
  /**
   * Timestamp to send fax at. If not specified (current or the past), the fax is sent immediately
   * Format: date-time
   */
  sendTime: string;
  /**
   * ISO Code. e.g UK
   */
  isoCode: string;
  /**
   * Cover page identifier. If coverIndex is set to '0' (zero) cover page is not attached. For the list of available cover page identifiers (1-13) please call the Fax Cover Pages method. If not specified, the default cover page is attached (which is configured in 'Outbound Fax Settings')
   * Format: int32
   */
  coverIndex: number;
  /**
   * Cover page text, entered by the fax sender and printed on the cover page. Maximum length is limited to 1024 symbols
   */
  coverPageText: string;
  /**
   * File to upload
   * Required
   * Format: binary
   */
  attachments: Attachment[];
}
