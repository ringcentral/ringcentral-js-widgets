export interface GlipTeamInfo {
  /**
   * Internal identifier of a team
   */
  id: string;
  /**
   * Type of a chat
   */
  type: 'Team';
  /**
   * Team access level
   */
  public: boolean;
  /**
   * Team name
   */
  name: string;
  /**
   * Team description
   */
  description: string;
  /**
   * Team status
   */
  status: 'Active' | 'Archived';
  /**
   * Team creation datetime in ISO 8601 format
   * Format: date-time
   */
  creationTime: string;
  /**
   * Team last change datetime in ISO 8601 format
   * Format: date-time
   */
  lastModifiedTime: string;
}
