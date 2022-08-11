import { ContactBusinessAddressInfo } from './ContactBusinessAddressInfo';
import { PronouncedNameInfo } from './PronouncedNameInfo';

// Contact Information
export interface ContactInfoCreationRequest {
  /**
   * For User extension type only. Extension user first name
   */
  firstName: string;
  /**
   * For User extension type only. Extension user last name
   */
  lastName: string;
  /**
   * Extension user company name
   */
  company: string;
  /**
   */
  jobTitle: string;
  /**
   * Email of extension user
   */
  email: string;
  /**
   * Extension user contact phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format
   */
  businessPhone: string;
  /**
   * Extension user mobile (**non** Toll Free) phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format
   */
  mobilePhone: string;
  /**
   */
  businessAddress: ContactBusinessAddressInfo;
  /**
   * If 'True' then contact email is enabled as login name for this user. Please note that email should be unique in this case. The default value is 'False'
   */
  emailAsLoginName: boolean;
  /**
   */
  pronouncedName: PronouncedNameInfo;
  /**
   * Extension user department, if any
   */
  department: string;
}
