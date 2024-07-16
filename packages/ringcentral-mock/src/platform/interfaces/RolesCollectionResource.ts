import type { RNPNavigationInfo } from './RNPNavigationInfo';
import type { RNPPagingInfo } from './RNPPagingInfo';
import type { RoleResource } from './RoleResource';

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
