import type { PeerInfo } from './PeerInfo';
import type { MobilePickupData } from './MobilePickupData';

export interface CallSessionStatusInfo {
  /**
   */
  code: string;
  /**
   */
  reason: string;
  /**
   */
  parkData: string;
  /**
   */
  peerId: PeerInfo;
  /**
   */
  mobilePickupData: MobilePickupData;
}
