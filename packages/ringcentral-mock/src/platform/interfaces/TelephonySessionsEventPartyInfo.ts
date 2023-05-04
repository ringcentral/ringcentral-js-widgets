import { CallPartyInfo } from './CallPartyInfo';
import { CallSessionStatusInfo } from './CallSessionStatusInfo';

export interface TelephonySessionsEventPartyInfo {
  /**
   */
  accountId: string;
  /**
   */
  extensionId: string;
  /**
   */
  id: string;
  /**
   */
  direction: 'Inbound' | 'Outbound';
  /**
   */
  to: CallPartyInfo;
  /**
   */
  from: CallPartyInfo;
  /**
   */
  status: CallSessionStatusInfo;
}
