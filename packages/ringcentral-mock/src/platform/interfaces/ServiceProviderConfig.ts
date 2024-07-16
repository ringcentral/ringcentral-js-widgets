import type { AuthenticationScheme } from './AuthenticationScheme';
import type { BulkSupported } from './BulkSupported';
import type { FilterSupported } from './FilterSupported';
import type { Supported } from './Supported';

export interface ServiceProviderConfig {
  /**
   */
  authenticationSchemes: AuthenticationScheme[];
  /**
   */
  bulk: BulkSupported;
  /**
   */
  changePassword: Supported;
  /**
   */
  etag: Supported;
  /**
   */
  filter: FilterSupported;
  /**
   */
  patch: Supported;
  /**
   */
  schemas: 'urn:ietf:params:scim:schemas:core:2.0:ServiceProviderConfig'[];
  /**
   */
  sort: Supported;
  /**
   */
  xmlDataFormat: Supported;
}
