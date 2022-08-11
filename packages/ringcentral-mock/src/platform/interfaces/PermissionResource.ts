import { PermissionCategoryIdResource } from './PermissionCategoryIdResource';
import { PermissionIdResource } from './PermissionIdResource';

export interface PermissionResource {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  id: string;
  /**
   */
  displayName: string;
  /**
   */
  description: string;
  /**
   */
  assignable: boolean;
  /**
   */
  readOnly: boolean;
  /**
   * Site compatibility flag set for permission
   */
  siteCompatible: 'Incompatible' | 'Compatible' | 'Independent';
  /**
   */
  category: PermissionCategoryIdResource;
  /**
   */
  includedPermissions: PermissionIdResource[];
}
