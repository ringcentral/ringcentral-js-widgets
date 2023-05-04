import { AccountResource } from './AccountResource';
import { PhoneNumberResource } from './PhoneNumberResource';
import { AccountDirectoryProfileImageResource } from './AccountDirectoryProfileImageResource';
import { BusinessSiteResource } from './BusinessSiteResource';
import { UserCustomFieldResource } from './UserCustomFieldResource';

export interface ContactResource {
  /**
   */
  account: AccountResource;
  /**
   */
  department: string;
  /**
   */
  email: string;
  /**
   */
  extensionNumber: string;
  /**
   * First name of a contact, for user extensions only
   */
  firstName: string;
  /**
   * Last name of a contact, for user extensions only
   */
  lastName: string;
  /**
   * Name of a contact, for non-user extensions
   */
  name: string;
  /**
   */
  id: string;
  /**
   */
  jobTitle: string;
  /**
   */
  phoneNumbers: PhoneNumberResource[];
  /**
   */
  profileImage: AccountDirectoryProfileImageResource;
  /**
   */
  site: BusinessSiteResource;
  /**
   */
  status: string;
  /**
   */
  type: string;
  /**
   */
  customFields: UserCustomFieldResource[];
}
