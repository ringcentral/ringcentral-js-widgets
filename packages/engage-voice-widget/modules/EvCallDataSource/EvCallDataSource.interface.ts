import { Mapping } from 'ringcentral-widgets/typings';

import { EvCallData } from '../../interfaces/EvData.interface';
import { EvClient } from '../../lib/EvClient';
import { EvAuth } from '../EvAuth';
import { EvStorage } from '../EvStorage';
import { EvTabManager } from '../EvTabManager';

export interface State {
  /** current agent ongoing session calls list with callId (encodeUii({ uii, sessionId })) */
  callIds: string[];
  /** other agent ongoing session calls list with callId (encodeUii({ uii, sessionId })) */
  otherCallIds: string[];
  /** ended calls list with c
   * allId (encodeUii({ uii, sessionId })) */
  callLogsIds: string[];
  /** mapping data with call session callId (encodeUii({ uii, sessionId })) */
  callsMapping: Mapping<EvCallData>;
  /** mapping data without call session data with uii */
  rawCallsMapping: Mapping<EvCallData>;
}

export interface EvCallDataSourceOptions {}
export interface Deps {
  storage: EvStorage;
  evClient: EvClient;
  evAuth: EvAuth;
  tabManager: EvTabManager;
}

export interface CallDataSource extends State {}
