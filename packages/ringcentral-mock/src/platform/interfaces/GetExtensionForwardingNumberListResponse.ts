import { ForwardingNumberInfo } from './ForwardingNumberInfo';
import { CallHandlingNavigationInfo } from './CallHandlingNavigationInfo';
import { CallHandlingPagingInfo } from './CallHandlingPagingInfo';

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
