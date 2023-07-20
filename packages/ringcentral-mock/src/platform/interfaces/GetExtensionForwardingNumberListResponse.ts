import type { ForwardingNumberInfo } from './ForwardingNumberInfo';
import type { CallHandlingNavigationInfo } from './CallHandlingNavigationInfo';
import type { CallHandlingPagingInfo } from './CallHandlingPagingInfo';

export interface GetExtensionForwardingNumberListResponse {
  /**
   * Link to the forwarding number list resource
   */
  uri: string;
  /**
   * List of forwarding phone numbers
   */
  records: ForwardingNumberInfo[];
  /**
   */
  navigation: CallHandlingNavigationInfo;
  /**
   */
  paging: CallHandlingPagingInfo;
}
