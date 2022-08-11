import { PermissionIdResource } from './PermissionIdResource';

export interface RoleResource {
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
   * Site compatibility of a user role
   */
  siteCompatible: boolean;
  /**
   */
  custom: boolean;
  /**
   */
  scope: string;
  /**
   */
  hidden: boolean;
  /**
   * Format: date-time
   */
  lastUpdated: string;
  /**
   */
  permissions: PermissionIdResource[];
}
