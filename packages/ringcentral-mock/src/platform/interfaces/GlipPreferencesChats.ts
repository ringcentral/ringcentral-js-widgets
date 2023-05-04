export interface GlipPreferencesChats {
  /**
   */
  maxCount: number;
  /**
   * Default: CombineAllChatTypes
   */
  leftRailMode:
    | 'SeparateAllChatTypes'
    | 'SeparateConversationsAndTeams'
    | 'CombineAllChatTypes';
}
