import { MessagingNavigationInfoURI } from './MessagingNavigationInfoURI';

// Information on navigation
export interface MessagingNavigationInfo {
  /**
   */
  firstPage: MessagingNavigationInfoURI;
  /**
   */
  nextPage: MessagingNavigationInfoURI;
  /**
   */
  previousPage: MessagingNavigationInfoURI;
  /**
   */
  lastPage: MessagingNavigationInfoURI;
}
