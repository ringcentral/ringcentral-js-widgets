import { UserAddress } from './UserAddress';
import { Email } from './Email';
import { Name } from './Name';
import { PhoneNumber } from './PhoneNumber';
import { Photo } from './Photo';
import { EnterpriseUser } from './EnterpriseUser';

export interface CreateUser {
  /**
   * User status
   */
  active: boolean;
  /**
   */
  addresses: UserAddress[];
  /**
   * Required
   */
  emails: Email[];
  /**
   * external unique resource id defined by provisioning client
   */
  externalId: string;
  /**
   * Required
   */
  name: Name;
  /**
   */
  phoneNumbers: PhoneNumber[];
  /**
   */
  photos: Photo[];
  /**
   * Required
   */
  schemas: 'urn:ietf:params:scim:schemas:core:2.0:User'[];
  /**
   */
  'urn:ietf:params:scim:schemas:extension:enterprise:2.0:User': EnterpriseUser;
  /**
   * MUST be same as work type email address
   * Required
   */
  userName: string;
}
