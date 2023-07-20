import type { BasicExtensionInfoResource } from './BasicExtensionInfoResource';
import type { RolesRegionalSettingsResource } from './RolesRegionalSettingsResource';
import type { ContactAddressInfoResource } from './ContactAddressInfoResource';

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
