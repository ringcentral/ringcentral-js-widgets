import { CreateGlipMember } from './CreateGlipMember';

export interface GlipConversationInfo {
  /**
   * Internal identifier of a conversation
   */
  id: string;
  /**
   * Type of a conversation
   */
  type: 'Direct' | 'Personal' | 'Group';
  /**
   * Conversation creation datetime in ISO 8601 format
   * Format: date-time
   */
  creationTime: string;
  /**
   * Conversation last change datetime in ISO 8601 format
   * Format: date-time
   */
  lastModifiedTime: string;
  /**
   * List of glip members
   */
  members: CreateGlipMember[];
}
