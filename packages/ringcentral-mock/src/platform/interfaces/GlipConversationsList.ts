import { GlipConversationInfo } from './GlipConversationInfo';
import { GlipNavigationInfo } from './GlipNavigationInfo';

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
