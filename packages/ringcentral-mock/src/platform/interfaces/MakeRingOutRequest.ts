import { MakeRingOutCallerInfoRequestFrom } from './MakeRingOutCallerInfoRequestFrom';
import { MakeRingOutCallerInfoRequestTo } from './MakeRingOutCallerInfoRequestTo';
import { MakeRingOutCallerIdInfo } from './MakeRingOutCallerIdInfo';
import { MakeRingOutCoutryInfo } from './MakeRingOutCoutryInfo';

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
