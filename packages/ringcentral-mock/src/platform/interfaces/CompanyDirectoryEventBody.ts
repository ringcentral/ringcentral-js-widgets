import type { CompanyDirectoryAccountInfo } from './CompanyDirectoryAccountInfo';
import type { CompanyDirectoryPhoneNumberInfo } from './CompanyDirectoryPhoneNumberInfo';
import type { ContactDirectorySiteInfo } from './ContactDirectorySiteInfo';
import type { CompanyDirectoryProfileImageInfo } from './CompanyDirectoryProfileImageInfo';

// Notification payload body
export interface CompanyDirectoryEventBody {
  /**
   * Internal identifier of an extension
   */
  id: string;
  /**
   * Type of change
   */
  eventType: string;
  /**
   * Type of extension
   */
  type: string;
  /**
   * Status of an extension
   */
  status: 'Enabled' | 'NotActivated' | 'Disabled';
  /**
   * First name of a user extension
   */
  firstName: string;
  /**
   * Last name of a user extension
   */
  lastName: string;
  /**
   * Name of a contact, for non-user extensions
   */
  name: string;
  /**
   * Department name
   */
  department: string;
  /**
   */
  email: string;
  /**
   */
  extensionNumber: string;
  /**
   */
  account: CompanyDirectoryAccountInfo;
  /**
   */
  phoneNumbers: CompanyDirectoryPhoneNumberInfo[];
  /**
   */
  site: ContactDirectorySiteInfo;
  /**
   */
  profileImage: CompanyDirectoryProfileImageInfo;
}
