import { AutomaticLocationUpdatesSiteInfo } from './AutomaticLocationUpdatesSiteInfo';
import { PublicIpRangeInfo } from './PublicIpRangeInfo';
import { PrivateIpRangeInfoRequest } from './PrivateIpRangeInfoRequest';
import { ERLLocationInfo } from './ERLLocationInfo';

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
