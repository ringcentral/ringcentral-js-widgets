import type { PermissionResource } from './PermissionResource';
import type { RNPNavigationInfo } from './RNPNavigationInfo';
import type { RNPPagingInfo } from './RNPPagingInfo';

export interface PermissionCollectionResource {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  records: PermissionResource[];
  /**
   */
  paging: RNPPagingInfo;
  /**
   */
  navigation: RNPNavigationInfo;
}
