import type { UserContactsNavigationInfoUri } from './UserContactsNavigationInfoUri';

// Information on navigation
export interface UserContactsNavigationInfo {
  /**
   */
  firstPage: UserContactsNavigationInfoUri;
  /**
   */
  nextPage: UserContactsNavigationInfoUri;
  /**
   */
  previousPage: UserContactsNavigationInfoUri;
  /**
   */
  lastPage: UserContactsNavigationInfoUri;
}
