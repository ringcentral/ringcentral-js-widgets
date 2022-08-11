import { AutomaticLocationUpdatesSiteInfo } from './AutomaticLocationUpdatesSiteInfo';

export interface AutomaticLocationUpdatesUserInfo {
  /**
   * Internal identifier of a device
   */
  id: string;
  /**
   * User name
   */
  fullName: string;
  /**
   */
  extensionNumber: string;
  /**
   * Specifies if Automatic Location Updates feature is enabled
   */
  featureEnabled: boolean;
  /**
   * User extension type
   */
  type: 'User' | 'Limited';
  /**
   */
  site: AutomaticLocationUpdatesSiteInfo;
  /**
   * Department name
   */
  department: string;
}
