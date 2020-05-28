import Storage from 'ringcentral-integration/modules/Storage';
import Alert from 'ringcentral-integration/modules/Alert';
import { Mapping } from 'ringcentral-widgets/typings';

import { EvCallData } from '../../interfaces/EvData.interface';
import { EvClient } from '../../lib/EvClient';
import { EvAuth } from '../EvAuth';
import { EvSubscription } from '../EvSubscription';
import { EvSettings } from '../EvSettings';
import { EvSessionConfig } from '../EvSessionConfig';
import { DialoutStatusesType } from '../../enums';

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

export interface DepsModules {
  evSubscription: EvSubscription;
  evClient: EvClient;
  evAuth: EvAuth;
  storage: Storage;
  evSettings: EvSettings;
  evSessionConfig: EvSessionConfig;
  alert: Alert;
}

export interface Presence extends State {
  addNewCall(call: EvCallData): void;
}
