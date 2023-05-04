import { MakeCallOutCallerInfoRequestFrom } from './MakeCallOutCallerInfoRequestFrom';
import { MakeCallOutCallerInfoRequestTo } from './MakeCallOutCallerInfoRequestTo';

export interface MakeCallOutRequest {
  /**
   * Required
   */
  from: MakeCallOutCallerInfoRequestFrom;
  /**
   * Required
   */
  to: MakeCallOutCallerInfoRequestTo;
}
