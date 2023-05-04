export interface AssignedRoleResource {
  /**
   * Internal identifier of a role
   */
  id: string;
  /**
   * Specifies if a role can be auto assigned
   */
  autoAssigned: boolean;
  /**
   * Name of a default role
   */
  displayName: string;
  /**
   * Site compatibility flag
   */
  siteCompatible: boolean;
  /**
   * Site restricted flag
   */
  siteRestricted: boolean;
}
