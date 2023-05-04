import { PermissionCategoryResource } from './PermissionCategoryResource';
import { RNPPagingInfo } from './RNPPagingInfo';
import { RNPNavigationInfo } from './RNPNavigationInfo';

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
