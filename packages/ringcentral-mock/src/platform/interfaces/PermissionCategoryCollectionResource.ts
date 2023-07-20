import type { PermissionCategoryResource } from './PermissionCategoryResource';
import type { RNPPagingInfo } from './RNPPagingInfo';
import type { RNPNavigationInfo } from './RNPNavigationInfo';

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
