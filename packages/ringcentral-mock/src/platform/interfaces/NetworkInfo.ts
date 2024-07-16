import type { AutomaticLocationUpdatesSiteInfo } from './AutomaticLocationUpdatesSiteInfo';
import type { ERLLocationInfo } from './ERLLocationInfo';
import type { PrivateIpRangeInfo } from './PrivateIpRangeInfo';
import type { PublicIpRangeInfo } from './PublicIpRangeInfo';

export interface NetworkInfo {
  /**
   * Internal identifier of a network
   */
  id: string;
  /**
   * Link to a network resource
   */
  uri: string;
  /**
   */
  name: string;
  /**
   */
  site: AutomaticLocationUpdatesSiteInfo;
  /**
   */
  publicIpRanges: PublicIpRangeInfo[];
  /**
   */
  privateIpRanges: PrivateIpRangeInfo[];
  /**
   */
  emergencyLocation: ERLLocationInfo;
}
