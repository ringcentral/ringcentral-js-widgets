export interface Roles {
  /**
   * Link to a role
   * Format: uri
   */
  uri: string;
  /**
   * Internal identifier of a role
   */
  id: string;
  /**
   */
  autoAssigned: boolean;
  /**
   */
  displayName: string;
  /**
   */
  siteCompatible: boolean;
  /**
   */
  siteRestricted: boolean;
}
