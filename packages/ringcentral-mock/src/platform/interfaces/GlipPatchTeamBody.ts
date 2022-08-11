export interface GlipPatchTeamBody {
  /**
   * Team access level
   */
  public: boolean;
  /**
   * Team name. Maximum number of characters supported is 250
   */
  name: string;
  /**
   * Team description. Maximum number of characters supported is 1000
   */
  description: string;
}
