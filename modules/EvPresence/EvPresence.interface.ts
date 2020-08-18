import Alert from 'ringcentral-integration/modules/Alert';
import Storage from 'ringcentral-integration/modules/Storage';
import { Mapping } from 'ringcentral-widgets/typings';

import { DialoutStatusesType } from '../../enums';
import { EvCallData } from '../../interfaces/EvData.interface';
import { EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';
import { EvSettings } from '../EvSettings';
import { EvSubscription } from '../EvSubscription';

export interface State {
  /** current agent ongoing session calls list with callId (encodeUii({ uii, sessionId })) */
  callIds: string[];
  /** other agent ongoing session calls list with callId (encodeUii({ uii, sessionId })) */
  otherCallIds: string[];
  /** ended calls list with callId (encodeUii({ uii, sessionId })) */
  callLogsIds: string[];
  /** mapping data with call session callId (encodeUii({ uii, sessionId })) */
  callsMapping: Mapping<EvCallData>;
  /** mapping data without call session data with uii */
  rawCallsMapping: Mapping<EvCallData>;
  /** current dialout statue */
  dialoutStatus: DialoutStatusesType;
  /**
   * temporary code for test screen pop sf object when inbound call
   */
  recordId: string;
  /**
   * temporary code for test screen pop sf object when inbound call
   */
  caseId: string;
  /**
   * temporary code for test screen pop sf object when inbound call
   */
  objectValue: string;
  /**
   * temporary code for test screen pop sf object when inbound call
   */
  objectType: string;
}

export interface PresenceOptions {
  //
}

export interface Deps {
  evSubscription: EvSubscription;
  evClient: EvClient;
  evAuth: EvAuth;
  storage: Storage;
  evSettings: EvSettings;
  evAgentSession: EvAgentSession;
  alert: Alert;
  presenceOptions?: PresenceOptions;
}

export interface Presence extends State {
  addNewCall(call: EvCallData): void;
}
