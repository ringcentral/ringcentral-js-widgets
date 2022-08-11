import { PartyInfo } from './PartyInfo';
import { OwnerInfo } from './OwnerInfo';
import { CallStatusInfo } from './CallStatusInfo';

export interface PartySuperviseResponse {
  /**
   */
  from: PartyInfo;
  /**
   */
  to: PartyInfo;
  /**
   * Direction of a call
   */
  direction: 'Outbound' | 'Inbound';
  /**
   * Internal identifier of a party that monitors a call
   */
  id: string;
  /**
   * Internal identifier of an account that monitors a call
   */
  accountId: string;
  /**
   * Internal identifier of an extension that monitors a call
   */
  extensionId: string;
  /**
   * Specifies if a call party is muted
   */
  muted: boolean;
  /**
   */
  owner: OwnerInfo;
  /**
   * Specifies if a device is stand-alone
   */
  standAlone: boolean;
  /**
   */
  status: CallStatusInfo;
}
