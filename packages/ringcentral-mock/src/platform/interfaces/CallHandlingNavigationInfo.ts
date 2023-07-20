import type { CallHandlingNavigationInfoUri } from './CallHandlingNavigationInfoUri';

// Information on navigation
export interface CallHandlingNavigationInfo {
  /**
   */
  firstPage: CallHandlingNavigationInfoUri;
  /**
   */
  nextPage: CallHandlingNavigationInfoUri;
  /**
   */
  previousPage: CallHandlingNavigationInfoUri;
  /**
   */
  lastPage: CallHandlingNavigationInfoUri;
}
