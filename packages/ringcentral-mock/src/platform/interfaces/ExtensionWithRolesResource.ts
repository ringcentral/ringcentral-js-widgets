import type { AssignedRoleResource } from './AssignedRoleResource';

export interface ExtensionWithRolesResource {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  extensionId: string;
  /**
   */
  roles: AssignedRoleResource[];
}
