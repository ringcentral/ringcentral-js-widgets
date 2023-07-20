import type { Alert } from '@ringcentral-integration/commons/modules/Alert';
import type { Beforeunload } from '@ringcentral-integration/widgets/modules/Beforeunload';
import type { Mapping } from '@ringcentral-integration/widgets/typings';

import type { DialoutStatusesType } from '../../enums';
import type { EvCallData } from '../../interfaces/EvData.interface';
import type { EvClient } from '../../lib/EvClient';
import type { EvCallDataSource } from '../EvCallDataSource';
import type { EvStorage } from '../EvStorage';
import type { EvSubscription } from '../EvSubscription';

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
