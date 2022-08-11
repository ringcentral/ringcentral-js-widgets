export interface GlipMentionsInfo {
  /**
   * Internal identifier of a user
   */
  id: string;
  /**
   * Type of mention
   */
  type:
    | 'Person'
    | 'Team'
    | 'File'
    | 'Link'
    | 'Event'
    | 'Task'
    | 'Note'
    | 'Card';
  /**
   * Name of a user
   */
  name: string;
}
