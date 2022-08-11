export interface BulkRoleAssignResource {
  /**
   * Example: true
   */
  siteRestricted: boolean;
  /**
   */
  siteCompatible: boolean;
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  addedExtensionIds: string[];
  /**
   */
  removedExtensionIds: string[];
}
