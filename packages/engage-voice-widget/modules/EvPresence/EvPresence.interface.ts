import { Alert } from '@ringcentral-integration/commons/modules/Alert';
import { Beforeunload } from '@ringcentral-integration/widgets/modules/Beforeunload';
import { Mapping } from '@ringcentral-integration/widgets/typings';

import { DialoutStatusesType } from '../../enums';
import { EvCallData } from '../../interfaces/EvData.interface';
import { EvClient } from '../../lib/EvClient';
import { EvCallDataSource } from '../EvCallDataSource';
import { EvStorage } from '../EvStorage';
import { EvSubscription } from '../EvSubscription';

export interface State {
  isOffhook: boolean;
  isOffhooking: boolean;
  isManualOffhook: boolean;

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
}

export interface PresenceOptions {
  //
}

export interface Deps {
  evSubscription: EvSubscription;
  evClient: EvClient;
  storage: EvStorage;
  alert: Alert;
  beforeunload: Beforeunload;
  evCallDataSource: EvCallDataSource;
  presenceOptions?: PresenceOptions;
}

export interface Presence extends State {
  addNewCall(call: EvCallData): void;
}
