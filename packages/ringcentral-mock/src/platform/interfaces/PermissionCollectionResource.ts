import { PermissionResource } from './PermissionResource';
import { RNPPagingInfo } from './RNPPagingInfo';
import { RNPNavigationInfo } from './RNPNavigationInfo';

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
