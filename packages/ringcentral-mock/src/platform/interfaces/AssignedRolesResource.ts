import type { AssignedRoleResource } from './AssignedRoleResource';

export interface AssignedRolesResource {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  records: AssignedRoleResource[];
}
