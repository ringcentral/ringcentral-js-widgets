import type { AutomaticLocationUpdatesSiteInfo } from './AutomaticLocationUpdatesSiteInfo';
import type { ERLLocationInfo } from './ERLLocationInfo';
import type { PrivateIpRangeInfoRequest } from './PrivateIpRangeInfoRequest';
import type { PublicIpRangeInfo } from './PublicIpRangeInfo';

export interface UpdateNetworkRequest {
  /**
   * Internal identifier of a network
   * Example: 2874044
   */
  id: string;
  /**
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
  privateIpRanges: PrivateIpRangeInfoRequest[];
  /**
   */
  emergencyLocation: ERLLocationInfo;
}
