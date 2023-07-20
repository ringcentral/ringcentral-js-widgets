import type { PresenceNavigationInfoURI } from './PresenceNavigationInfoURI';

// Information on navigation
export interface PresenceNavigationInfo {
  /**
   */
  firstPage: PresenceNavigationInfoURI;
  /**
   */
  nextPage: PresenceNavigationInfoURI;
  /**
   */
  previousPage: PresenceNavigationInfoURI;
  /**
   */
  lastPage: PresenceNavigationInfoURI;
}
