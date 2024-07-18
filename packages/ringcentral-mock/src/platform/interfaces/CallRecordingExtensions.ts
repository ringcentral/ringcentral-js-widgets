import type { CallHandlingNavigationInfo } from './CallHandlingNavigationInfo';
import type { CallHandlingPagingInfo } from './CallHandlingPagingInfo';
import type { CallRecordingExtensionInfo } from './CallRecordingExtensionInfo';

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
