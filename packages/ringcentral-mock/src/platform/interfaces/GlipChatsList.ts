import { GlipChatInfo } from './GlipChatInfo';
import { GlipNavigationInfo } from './GlipNavigationInfo';

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
