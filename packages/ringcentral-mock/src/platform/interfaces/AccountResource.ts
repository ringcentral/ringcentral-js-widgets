import type { PhoneNumberResource } from './PhoneNumberResource';

export interface AccountResource {
  /**
   */
  companyName: string;
  /**
   */
  federatedName: string;
  /**
   */
  id: string;
  /**
   */
  mainNumber: PhoneNumberResource;
}
