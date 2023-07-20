import type { PersonalContactResource } from './PersonalContactResource';
import type { UserContactsNavigationInfo } from './UserContactsNavigationInfo';
import type { UserContactsPagingInfo } from './UserContactsPagingInfo';
import type { UserContactsGroupsInfo } from './UserContactsGroupsInfo';

export interface ContactList {
  /**
   * link to the list of user personal contacts
   */
  uri: string;
  /**
   * List of personal contacts from the extension address book
   */
  records: PersonalContactResource[];
  /**
   */
  navigation: UserContactsNavigationInfo;
  /**
   */
  paging: UserContactsPagingInfo;
  /**
   */
  groups: UserContactsGroupsInfo;
}
