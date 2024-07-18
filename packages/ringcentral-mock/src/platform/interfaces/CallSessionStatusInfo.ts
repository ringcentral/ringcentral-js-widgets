import type { MobilePickupData } from './MobilePickupData';
import type { PeerInfo } from './PeerInfo';

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
