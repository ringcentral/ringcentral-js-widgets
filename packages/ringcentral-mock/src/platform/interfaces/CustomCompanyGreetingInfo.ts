import type { CustomCompanyGreetingLanguageInfo } from './CustomCompanyGreetingLanguageInfo';
import type { CustomGreetingAnsweringRuleInfo } from './CustomGreetingAnsweringRuleInfo';

export interface CustomCompanyGreetingInfo {
  /**
   * Link to an extension custom greeting
   */
  uri: string;
  /**
   * Internal identifier of an answering rule
   */
  id: string;
  /**
   * Type of a company greeting
   */
  type: 'Company' | 'StartRecording' | 'StopRecording' | 'AutomaticRecording';
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
  /**
   */
  language: CustomCompanyGreetingLanguageInfo;
}
