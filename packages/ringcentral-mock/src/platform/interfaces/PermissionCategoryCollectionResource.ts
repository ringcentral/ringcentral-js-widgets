import type { PermissionCategoryResource } from './PermissionCategoryResource';
import type { RNPNavigationInfo } from './RNPNavigationInfo';
import type { RNPPagingInfo } from './RNPPagingInfo';

export interface PermissionCategoryCollectionResource {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  records: PermissionCategoryResource[];
  /**
   */
  paging: RNPPagingInfo;
  /**
   */
  navigation: RNPNavigationInfo;
}
