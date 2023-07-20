import type { DictionaryGreetingInfo } from './DictionaryGreetingInfo';
import type { CallHandlingNavigationInfo } from './CallHandlingNavigationInfo';
import type { CallHandlingPagingInfo } from './CallHandlingPagingInfo';

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
