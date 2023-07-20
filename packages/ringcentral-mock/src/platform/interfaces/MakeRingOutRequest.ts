import type { MakeRingOutCallerInfoRequestFrom } from './MakeRingOutCallerInfoRequestFrom';
import type { MakeRingOutCallerInfoRequestTo } from './MakeRingOutCallerInfoRequestTo';
import type { MakeRingOutCallerIdInfo } from './MakeRingOutCallerIdInfo';
import type { MakeRingOutCoutryInfo } from './MakeRingOutCoutryInfo';

export interface MakeRingOutRequest {
  /**
   * Required
   */
  from: MakeRingOutCallerInfoRequestFrom;
  /**
   * Required
   */
  to: MakeRingOutCallerInfoRequestTo;
  /**
   */
  callerId: MakeRingOutCallerIdInfo;
  /**
   * The audio prompt that the calling party hears when the call is connected
   */
  playPrompt: boolean;
  /**
   */
  country: MakeRingOutCoutryInfo;
}
