import type { GlipMentionsInfo } from './GlipMentionsInfo';
import type { GlipMessageAttachmentInfo } from './GlipMessageAttachmentInfo';

export interface GlipPostInfo {
  /**
   * Internal identifier of a post
   */
  id: string;
  /**
   * Internal identifier of a group a post belongs to
   */
  groupId: string;
  /**
   * Type of a post
   */
  type: 'TextMessage' | 'PersonJoined' | 'PersonsAdded';
  /**
   * For 'TextMessage' post type only. Text of a message
   */
  text: string;
  /**
   * Internal identifier of a user - author of a post
   */
  creatorId: string;
  /**
   * For 'PersonsAdded' post type only. Identifiers of persons added to a group
   */
  addedPersonIds: string[];
  /**
   * Post creation datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   * Format: date-time
   */
  creationTime: string;
  /**
   * Post last modification datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   * Format: date-time
   */
  lastModifiedTime: string;
  /**
   * List of posted attachments
   */
  attachments: GlipMessageAttachmentInfo[];
  /**
   */
  mentions: GlipMentionsInfo[];
  /**
   * Label of activity type
   */
  activity: string;
  /**
   * Title of a message. (Can be set for bot's messages only)
   */
  title: string;
  /**
   * Link to an image used as an icon for this message
   */
  iconUri: string;
  /**
   * Emoji used as an icon for this message
   */
  iconEmoji: string;
}
