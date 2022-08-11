import { PeerInfo } from './PeerInfo';
import { MobilePickupData } from './MobilePickupData';

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
