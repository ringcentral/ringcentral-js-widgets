import type { AdaptiveCardCreator } from './AdaptiveCardCreator';

export interface GlipAdaptiveCardShortInfo {
  /**
   * Internal identifier of an adaptive card
   */
  id: string;
  /**
   * Adaptive Card creation datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   * Format: date-time
   */
  creationTime: string;
  /**
   * Post last modification datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   * Format: date-time
   */
  lastModifiedTime: string;
  /**
   * Schema of an adaptive card
   */
  $schema: string;
  /**
   */
  type: 'AdaptiveCard';
  /**
   * Version of an adaptive card. Filled on server-side
   */
  version: string;
  /**
   */
  creator: AdaptiveCardCreator;
  /**
   * Chat IDs where an adaptive card is posted or shared.
   */
  chatIds: string[];
}
