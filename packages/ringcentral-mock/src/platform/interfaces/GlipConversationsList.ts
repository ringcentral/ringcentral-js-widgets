import type { GlipConversationInfo } from './GlipConversationInfo';
import type { GlipNavigationInfo } from './GlipNavigationInfo';

export interface GlipConversationsList {
  /**
   * List of conversations
   * Required
   */
  records: GlipConversationInfo[];
  /**
   */
  navigation: GlipNavigationInfo;
}
