import type { PronouncedNamePromptInfo } from './PronouncedNamePromptInfo';

export interface PronouncedNameInfo {
  /**
   * Voice name type. 'Default' - default extension name; first name and last name specified in user profile; 'TextToSpeech' - custom text; user name spelled the way it sounds and specified by user; 'Recorded' - custom audio, user name recorded in user's own voice (supported only for extension retrieval)
   */
  type: 'Default' | 'TextToSpeech' | 'Recorded';
  /**
   * Custom text
   */
  text: string;
  /**
   */
  prompt: PronouncedNamePromptInfo;
}
