import type { RingOutStatusInfo } from './RingOutStatusInfo';

export interface GetRingOutStatusResponse {
  /**
   * Internal identifier of a RingOut call
   */
  id: string;
  /**
   */
  uri: string;
  /**
   */
  status: RingOutStatusInfo;
}
