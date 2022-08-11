import { PermissionIdResource } from './PermissionIdResource';
import { RoleIdResource } from './RoleIdResource';

export interface ActivePermissionResource {
  /**
   */
  permission: PermissionIdResource;
  /**
   */
  effectiveRole: RoleIdResource;
  /**
   */
  scopes: (
    | 'Account'
    | 'AllExtensions'
    | 'Federation'
    | 'NonUserExtensions'
    | 'RoleBased'
    | 'Self'
    | 'UserExtensions'
  )[];
}
