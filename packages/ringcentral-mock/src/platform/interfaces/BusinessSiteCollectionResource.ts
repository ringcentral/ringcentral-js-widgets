import { RolesBusinessSiteResource } from './RolesBusinessSiteResource';

export interface BusinessSiteCollectionResource {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  records: RolesBusinessSiteResource[];
}
