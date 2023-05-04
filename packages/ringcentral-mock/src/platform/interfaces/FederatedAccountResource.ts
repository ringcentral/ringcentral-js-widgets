import { PhoneNumberResource } from './PhoneNumberResource';

export interface FederatedAccountResource {
  /**
   */
  companyName: string;
  /**
   * Format: int32
   */
  conflictCount: number;
  /**
   */
  federatedName: string;
  /**
   */
  id: string;
  /**
   */
  linkCreationTime: string;
  /**
   */
  mainNumber: PhoneNumberResource;
}
