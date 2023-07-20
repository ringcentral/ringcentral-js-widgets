import type { GetPresenceInfo } from './GetPresenceInfo';
import type { PresenceNavigationInfo } from './PresenceNavigationInfo';
import type { PresencePagingInfo } from './PresencePagingInfo';

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
