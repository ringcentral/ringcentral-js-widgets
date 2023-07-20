import type { AccountResource } from './AccountResource';
import type { PhoneNumberResource } from './PhoneNumberResource';
import type { AccountDirectoryProfileImageResource } from './AccountDirectoryProfileImageResource';
import type { BusinessSiteResource } from './BusinessSiteResource';
import type { UserCustomFieldResource } from './UserCustomFieldResource';

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
