import { PermissionInfoAdmin } from './PermissionInfoAdmin';
import { PermissionInfoInt } from './PermissionInfoInt';

// Extension permissions, corresponding to the Service Web permissions 'Admin' and 'InternationalCalling'
export interface ExtensionPermissions {
  /**
   */
  admin: PermissionInfoAdmin;
  /**
   */
  internationalCalling: PermissionInfoInt;
}
