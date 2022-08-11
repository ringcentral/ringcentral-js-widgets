import { CreateGlipMember } from './CreateGlipMember';

export interface CreateGlipConversationRequest {
  /**
   * List of glip members. The maximum supported number of IDs is 15. User's own ID is optional. If `members` section is omitted then 'Personal' chat will be returned
   * Required
   */
  members: CreateGlipMember[];
}
