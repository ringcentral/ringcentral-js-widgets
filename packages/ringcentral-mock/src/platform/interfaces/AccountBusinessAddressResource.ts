import type { ContactBusinessAddressInfo } from './ContactBusinessAddressInfo';

export interface AccountBusinessAddressResource {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  businessAddress: ContactBusinessAddressInfo;
  /**
   */
  company: string;
  /**
   */
  email: string;
  /**
   * Custom site name
   */
  mainSiteName: string;
}
