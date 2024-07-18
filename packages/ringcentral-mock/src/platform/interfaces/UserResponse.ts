import type { Email } from './Email';
import type { EnterpriseUser } from './EnterpriseUser';
import type { Meta } from './Meta';
import type { Name } from './Name';
import type { PhoneNumber } from './PhoneNumber';
import type { Photo } from './Photo';
import type { UserAddress } from './UserAddress';

export interface UserResponse {
  /**
   * user status
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
   * unique resource id defined by RingCentral
   */
  id: string;
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
  /**
   */
  meta: Meta;
}
