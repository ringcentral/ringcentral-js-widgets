import type { GlipMentionsInfo } from './GlipMentionsInfo';

export interface GlipPostEvent {
  /**
   * Internal identifier of a post
   */
  id: string;
  /**
   * Type of a post event
   */
  eventType: 'PostAdded' | 'PostChanged' | 'PostRemoved';
  /**
   * Internal identifier of a group a post belongs to
   */
  groupId: string;
  /**
   * Type of a post. 'TextMessage' - an incoming text message; 'PersonJoined' - a message notifying that person has joined a conversation; 'PersonsAdded' - a message notifying that a person(s) were added to a conversation
   */
  type: 'TextMessage' | 'PersonJoined' | 'PersonsAdded' | 'Card';
  /**
   * For 'TextMessage' post type only. Message text
   */
  text: string;
  /**
   * Internal identifier of a user - author of a post
   */
  creatorId: string;
  /**
   * For PersonsAdded post type only. Identifiers of persons added to a group
   */
  addedPersonIds: string[];
  /**
   * For PersonsRemoved post type only. Identifiers of persons removed from a group
   */
  removedPersonIds: string[];
  /**
   * List of mentions in post text with names.
   */
  mentions: GlipMentionsInfo[];
  /**
   * Post creation datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   * Format: date-time
   */
  creationTime: string;
  /**
   * Post last change datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   * Format: date-time
   */
  lastModifiedTime: string;
}
