import { SiteResource } from './SiteResource';

// Call queue member information
export interface CallQueueMember {
  /**
   * Internal identifier of an extension
   */
  id: string;
  /**
   * Extension full name
   */
  name: string;
  /**
   * Extension number
   */
  extensionNumber: string;
  /**
   */
  site: SiteResource;
}
