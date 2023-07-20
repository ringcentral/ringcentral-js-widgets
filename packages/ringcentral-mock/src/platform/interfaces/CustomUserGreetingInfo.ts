import type { CustomGreetingAnsweringRuleInfo } from './CustomGreetingAnsweringRuleInfo';

export interface CustomUserGreetingInfo {
  /**
   * Link to a custom user greeting
   */
  uri: string;
  /**
   * Internal identifier of a custom user greeting
   */
  id: string;
  /**
   * Type of a custom user greeting
   */
  type:
    | 'Introductory'
    | 'Announcement'
    | 'InterruptPrompt'
    | 'ConnectingAudio'
    | 'ConnectingMessage'
    | 'Voicemail'
    | 'Unavailable'
    | 'HoldMusic'
    | 'PronouncedName';
  /**
   * Content media type
   */
  contentType: 'audio/mpeg' | 'audio/wav';
  /**
   * Link to a greeting content (audio file)
   */
  contentUri: string;
  /**
   */
  answeringRule: CustomGreetingAnsweringRuleInfo;
}
