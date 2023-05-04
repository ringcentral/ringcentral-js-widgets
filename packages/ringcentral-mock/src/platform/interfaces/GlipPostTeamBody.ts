import { CreateGlipMember } from './CreateGlipMember';

export interface GlipPostTeamBody {
  /**
   * Team access level.
   */
  public: boolean;
  /**
   * Team name.
   * Required
   */
  name: string;
  /**
   * Team description.
   */
  description: string;
  /**
   * List of glip members
   */
  members: CreateGlipMember[];
}
