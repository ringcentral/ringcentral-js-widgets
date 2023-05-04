// resource metadata
export interface Meta {
  /**
   * Format: date-time
   */
  created: string;
  /**
   * Format: date-time
   */
  lastModified: string;
  /**
   * resource location URI
   */
  location: string;
  /**
   */
  resourceType: 'User' | 'Group';
}
