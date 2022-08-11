import { ActivePermissionResource } from './ActivePermissionResource';

export interface AuthProfileCheckResource {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  successful: boolean;
  /**
   */
  details: ActivePermissionResource;
}
