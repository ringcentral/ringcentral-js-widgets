import { GlipMemberInfo } from './GlipMemberInfo';

export interface GlipPostMembersIdsListBody {
  /**
   * Identifier(s) of chat members.
   * Required
   */
  members: GlipMemberInfo[];
}
