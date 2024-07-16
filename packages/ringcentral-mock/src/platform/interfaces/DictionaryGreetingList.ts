import type { CallHandlingNavigationInfo } from './CallHandlingNavigationInfo';
import type { CallHandlingPagingInfo } from './CallHandlingPagingInfo';
import type { DictionaryGreetingInfo } from './DictionaryGreetingInfo';

export interface DictionaryGreetingList {
  /**
   * Canonical URI of greetings list resource
   */
  uri: string;
  /**
   * List of greetings
   */
  records: DictionaryGreetingInfo[];
  /**
   */
  navigation: CallHandlingNavigationInfo;
  /**
   */
  paging: CallHandlingPagingInfo;
}
