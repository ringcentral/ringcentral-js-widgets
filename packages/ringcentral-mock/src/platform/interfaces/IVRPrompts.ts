import type { CallHandlingNavigationInfo } from './CallHandlingNavigationInfo';
import type { CallHandlingPagingInfo } from './CallHandlingPagingInfo';
import type { PromptInfo } from './PromptInfo';

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
