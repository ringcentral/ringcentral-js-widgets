import { RoleResource } from './RoleResource';
import { RNPPagingInfo } from './RNPPagingInfo';
import { RNPNavigationInfo } from './RNPNavigationInfo';

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
