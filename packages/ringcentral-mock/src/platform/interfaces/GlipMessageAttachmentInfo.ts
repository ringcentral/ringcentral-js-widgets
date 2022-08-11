import { GlipMessageAttachmentAuthorInfo } from './GlipMessageAttachmentAuthorInfo';
import { GlipMessageAttachmentFieldsInfo } from './GlipMessageAttachmentFieldsInfo';
import { GlipMessageAttachmentFootnoteInfo } from './GlipMessageAttachmentFootnoteInfo';

export interface GlipMessageAttachmentInfo {
  /**
   * Internal identifier of an attachment
   */
  id: string;
  /**
   * Type of an attachment
   * Default: Card
   */
  type: 'Card' | 'Event' | 'File' | 'Note' | 'Task';
  /**
   * A string of default text that will be rendered in the case that the client does not support Interactive Messages
   */
  fallback: string;
  /**
   * A pretext to the message
   */
  intro: string;
  /**
   */
  author: GlipMessageAttachmentAuthorInfo;
  /**
   * Message title
   */
  title: string;
  /**
   * A large string field (up to 1000 chars) to be displayed as the body of a message (Supports GlipDown)
   */
  text: string;
  /**
   * Link to an image displayed at the bottom of a message
   */
  imageUri: string;
  /**
   * Link to an image preview displayed to the right of a message (82x82)
   */
  thumbnailUri: string;
  /**
   * Information on navigation
   */
  fields: GlipMessageAttachmentFieldsInfo[];
  /**
   */
  footnote: GlipMessageAttachmentFootnoteInfo;
  /**
   * Internal identifier of a person created an event
   */
  creatorId: string;
  /**
   * Datetime of starting an event
   */
  startTime: string;
  /**
   * Datetime of ending an event
   */
  endTime: string;
  /**
   * Indicates whether an event has some specific time slot or lasts for the whole day(s)
   */
  allDay: boolean;
  /**
   * Event recurrence settings.
   */
  recurrence: 'None' | 'Day' | 'Weekday' | 'Week' | 'Month' | 'Year';
  /**
   * Condition of ending
   */
  endingCondition: string;
  /**
   * Count of iterations. For periodic events only
   */
  endingAfter: number;
  /**
   * Iterations end datetime for periodic events
   * Default: None
   */
  endingOn: 'None' | 'Count' | 'Date';
  /**
   * Color of Event title, including its presentation in Calendar; or the color of the side border of an interactive message of a Card
   * Default: Black
   */
  color:
    | 'Black'
    | 'Red'
    | 'Orange'
    | 'Yellow'
    | 'Green'
    | 'Blue'
    | 'Purple'
    | 'Magenta';
  /**
   * Event location
   */
  location: string;
  /**
   * Event details
   */
  description: string;
}
