import type { AutomaticLocationUpdatesSiteInfo } from './AutomaticLocationUpdatesSiteInfo';
import type { PublicIpRangeInfo } from './PublicIpRangeInfo';
import type { PrivateIpRangeInfoRequest } from './PrivateIpRangeInfoRequest';
import type { ERLLocationInfo } from './ERLLocationInfo';

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
