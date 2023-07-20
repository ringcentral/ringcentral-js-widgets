import type { BlockedAllowedPhoneNumberInfo } from './BlockedAllowedPhoneNumberInfo';
import type { CallHandlingNavigationInfo } from './CallHandlingNavigationInfo';
import type { CallHandlingPagingInfo } from './CallHandlingPagingInfo';

// List of blocked or allowed phone numbers
export interface BlockedAllowedPhoneNumbersList {
  /**
   * Link to a list of blocked/allowed phone numbers resource
   */
  uri: string;
  /**
   */
  records: BlockedAllowedPhoneNumberInfo[];
  /**
   */
  navigation: CallHandlingNavigationInfo;
  /**
   */
  paging: CallHandlingPagingInfo;
}
