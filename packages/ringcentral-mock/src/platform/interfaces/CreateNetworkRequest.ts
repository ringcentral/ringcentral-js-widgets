import type { AutomaticLocationUpdatesSiteInfo } from './AutomaticLocationUpdatesSiteInfo';
import type { ERLLocationInfo } from './ERLLocationInfo';
import type { PrivateIpRangeInfoRequest } from './PrivateIpRangeInfoRequest';
import type { PublicIpRangeInfo } from './PublicIpRangeInfo';

export interface CreateNetworkRequest {
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
