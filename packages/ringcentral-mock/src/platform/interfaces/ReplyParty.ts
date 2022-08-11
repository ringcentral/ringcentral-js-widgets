import { CallStatusInfo } from './CallStatusInfo';
import { ParkInfo } from './ParkInfo';
import { PartyInfo } from './PartyInfo';
import { OwnerInfo } from './OwnerInfo';

export interface ReplyParty {
  /**
   * Internal identifier of a party
   */
  id: string;
  /**
   */
  status: CallStatusInfo;
  /**
   * Specifies if a call participant is muted or not. **Note:** If a call is also controlled via Hard phone or RingCentral App (not only through the API by calling call control methods) then it cannot be fully muted/unmuted via API only, in this case the action should be duplicated via Hard phone/RC App interfaces
   */
  muted: boolean;
  /**
   * If 'True' then the party is not connected to a session voice conference, 'False' means the party is connected to other parties in a session
   */
  standAlone: boolean;
  /**
   */
  park: ParkInfo;
  /**
   */
  from: PartyInfo;
  /**
   */
  to: PartyInfo;
  /**
   */
  owner: OwnerInfo;
  /**
   * Direction of a call
   */
  direction: 'Inbound' | 'Outbound';
}
