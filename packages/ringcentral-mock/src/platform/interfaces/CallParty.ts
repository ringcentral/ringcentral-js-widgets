import type { CallStatusInfo } from './CallStatusInfo';
import type { ParkInfo } from './ParkInfo';
import type { PartyInfo } from './PartyInfo';
import type { OwnerInfo } from './OwnerInfo';
import type { RecordingInfo } from './RecordingInfo';

// Information on a party of a call session
export interface CallParty {
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
  /**
   * A party's role in the conference scenarios. For calls of 'Conference' type only
   */
  conferenceRole: 'Host' | 'Participant';
  /**
   * A party's role in 'Ring Me'/'RingOut' scenarios. For calls of 'Ringout' type only
   */
  ringOutRole: 'Initiator' | 'Target';
  /**
   * A party's role in 'Ring Me'/'RingOut' scenarios. For calls of 'Ringme' type only
   */
  ringMeRole: 'Initiator' | 'Target';
  /**
   * Active recordings list
   */
  recordings: RecordingInfo[];
}
