import type { GlipMemberInfo } from './GlipMemberInfo';

export interface GlipGroupsEvent {
  /**
   * Internal identifier of a group
   */
  id: string;
  /**
   * Type of a group. 'PrivateChat' is a group of 2 members. 'Group' is a chat of 2 and more participants, the membership cannot be changed after group creation. 'Team' is a chat of 1 and more participants, the membership can be modified in future. 'PersonalChat' is a private chat thread of a user
   */
  type: 'PrivateChat' | 'Group' | 'Team' | 'PersonalChat';
  /**
   * For 'Team' group type only. Team access level
   */
  isPublic: boolean;
  /**
   * For 'Team' group type only. Team name
   */
  name: string;
  /**
   * For 'Team' group type only. Team description
   */
  description: string;
  /**
   * “List of glip members”
   */
  members: GlipMemberInfo[];
  /**
   * Group creation datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   * Format: date-time
   */
  creationTime: string;
  /**
   * Group last change datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   * Format: date-time
   */
  lastModifiedTime: string;
  /**
   * Type of a group event. Only the person who joined/was added to a group will receive 'GroupJoined' notification. Only the person who left/was removed from a group will receive 'GroupLeft' notification
   */
  eventType: 'GroupRenamed' | 'GroupJoined' | 'GroupLeft' | 'GroupChanged';
}
