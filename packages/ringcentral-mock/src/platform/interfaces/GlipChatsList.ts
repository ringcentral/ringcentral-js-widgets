import type { GlipChatInfo } from './GlipChatInfo';
import type { GlipNavigationInfo } from './GlipNavigationInfo';

export interface GlipChatsList {
  /**
   * List of chats
   * Required
   */
  records: GlipChatInfo[];
  /**
   */
  navigation: GlipNavigationInfo;
}
