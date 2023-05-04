import { BasicExtensionInfoResource } from './BasicExtensionInfoResource';
import { RolesRegionalSettingsResource } from './RolesRegionalSettingsResource';
import { ContactAddressInfoResource } from './ContactAddressInfoResource';

export interface RolesBusinessSiteResource {
  /**
   * Required
   */
  id: string;
  /**
   */
  email: string;
  /**
   */
  code: string;
  /**
   */
  name: string;
  /**
   */
  extensionNumber: string;
  /**
   */
  callerIdName: string;
  /**
   */
  operator: BasicExtensionInfoResource;
  /**
   */
  regionalSettings: RolesRegionalSettingsResource;
  /**
   */
  businessAddress: ContactAddressInfoResource;
}
