import { DictionaryGreetingInfo } from './DictionaryGreetingInfo';
import { CallHandlingNavigationInfo } from './CallHandlingNavigationInfo';
import { CallHandlingPagingInfo } from './CallHandlingPagingInfo';

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
