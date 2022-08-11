import { CallLogNavigationInfoURI } from './CallLogNavigationInfoURI';

// Information on navigation
export interface CallLogNavigationInfo {
  /**
   */
  firstPage: CallLogNavigationInfoURI;
  /**
   */
  nextPage: CallLogNavigationInfoURI;
  /**
   */
  previousPage: CallLogNavigationInfoURI;
}
