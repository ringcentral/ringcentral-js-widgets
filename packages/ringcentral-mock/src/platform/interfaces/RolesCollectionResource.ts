import type { RoleResource } from './RoleResource';
import type { RNPPagingInfo } from './RNPPagingInfo';
import type { RNPNavigationInfo } from './RNPNavigationInfo';

export interface RolesCollectionResource {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  records: RoleResource[];
  /**
   */
  paging: RNPPagingInfo;
  /**
   */
  navigation: RNPNavigationInfo;
}
