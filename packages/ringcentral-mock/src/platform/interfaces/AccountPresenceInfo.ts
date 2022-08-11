import { GetPresenceInfo } from './GetPresenceInfo';
import { PresenceNavigationInfo } from './PresenceNavigationInfo';
import { PresencePagingInfo } from './PresencePagingInfo';

export interface AccountPresenceInfo {
  /**
   * Canonical URI of account presence resource
   */
  uri: string;
  /**
   * List of Prompts
   */
  records: GetPresenceInfo[];
  /**
   */
  navigation: PresenceNavigationInfo;
  /**
   */
  paging: PresencePagingInfo;
}
