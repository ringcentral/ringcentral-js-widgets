import type { PermissionResource } from './PermissionResource';
import type { RNPPagingInfo } from './RNPPagingInfo';
import type { RNPNavigationInfo } from './RNPNavigationInfo';

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
