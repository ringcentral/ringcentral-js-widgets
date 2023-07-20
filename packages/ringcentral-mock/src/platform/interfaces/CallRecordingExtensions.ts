import type { CallRecordingExtensionInfo } from './CallRecordingExtensionInfo';
import type { CallHandlingNavigationInfo } from './CallHandlingNavigationInfo';
import type { CallHandlingPagingInfo } from './CallHandlingPagingInfo';

export interface CallRecordingExtensions {
  /**
   * Link to call recording extension list resource
   */
  uri: string;
  /**
   */
  records: CallRecordingExtensionInfo[];
  /**
   */
  navigation: CallHandlingNavigationInfo;
  /**
   */
  paging: CallHandlingPagingInfo;
}
