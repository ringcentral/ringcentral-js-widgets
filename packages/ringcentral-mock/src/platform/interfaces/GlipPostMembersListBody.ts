import { CreateGlipMember } from './CreateGlipMember';

export interface GlipPostMembersListBody {
  /**
   * List of glip members
   * Required
   */
  members: CreateGlipMember[];
}
