import type { PromptInfo } from './PromptInfo';
import type { CallHandlingNavigationInfo } from './CallHandlingNavigationInfo';
import type { CallHandlingPagingInfo } from './CallHandlingPagingInfo';

export interface IVRPrompts {
  /**
   * Link to prompts library resource
   */
  uri: string;
  /**
   * List of Prompts
   */
  records: PromptInfo[];
  /**
   */
  navigation: CallHandlingNavigationInfo;
  /**
   */
  paging: CallHandlingPagingInfo;
}
