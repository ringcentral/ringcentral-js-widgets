import type { MakeCallOutCallerInfoRequestFrom } from './MakeCallOutCallerInfoRequestFrom';
import type { MakeCallOutCallerInfoRequestTo } from './MakeCallOutCallerInfoRequestTo';

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
