import type { GlipChatInfo } from './GlipChatInfo';

export interface GlipChatsListWithoutNavigation {
  /**
   * List of chats
   * Required
   */
  records: GlipChatInfo[];
}
