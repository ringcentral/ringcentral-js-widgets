import type { ActivePermissionResource } from './ActivePermissionResource';

export interface AuthProfileResource {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  permissions: ActivePermissionResource[];
}
