import { Attachment } from './Attachment';

// Request body for operation createCustomUserGreeting
export interface CreateCustomUserGreetingRequest {
  /**
   * Type of a greeting, specifying the case when the greeting is played.
   * Required
   */
  type:
    | 'Introductory'
    | 'Announcement'
    | 'ConnectingMessage'
    | 'ConnectingAudio'
    | 'Voicemail'
    | 'Unavailable'
    | 'HoldMusic';
  /**
   * Internal identifier of an answering rule
   */
  answeringRuleId: string;
  /**
   * Media file to upload
   * Required
   */
  binary: Attachment;
}
