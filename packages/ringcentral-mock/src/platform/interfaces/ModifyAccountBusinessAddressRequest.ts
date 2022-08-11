import { BusinessAddressInfo } from './BusinessAddressInfo';

export interface ModifyAccountBusinessAddressRequest {
  /**
   * Company business name
   */
  company: string;
  /**
   * Company business email address
   */
  email: string;
  /**
   */
  businessAddress: BusinessAddressInfo;
  /**
   * Custom site name
   */
  mainSiteName: string;
}
