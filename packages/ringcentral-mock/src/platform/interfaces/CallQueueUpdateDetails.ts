import { CallQueueServiceLevelSettings } from './CallQueueServiceLevelSettings';

export interface CallQueueUpdateDetails {
  /**
   */
  serviceLevelSettings: CallQueueServiceLevelSettings;
  /**
   * Allows members to change their queue status
   */
  editableMemberStatus: boolean;
}
