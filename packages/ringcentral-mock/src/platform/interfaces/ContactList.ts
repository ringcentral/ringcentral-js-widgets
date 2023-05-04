import { PersonalContactResource } from './PersonalContactResource';
import { UserContactsNavigationInfo } from './UserContactsNavigationInfo';
import { UserContactsPagingInfo } from './UserContactsPagingInfo';
import { UserContactsGroupsInfo } from './UserContactsGroupsInfo';

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
