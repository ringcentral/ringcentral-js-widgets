import type { Alert } from '@ringcentral-integration/commons/modules/Alert';

import type { EvClient } from '../../lib/EvClient';
import type { EvActiveCallControl } from '../EvActiveCallControl';
import type { EvAuth } from '../EvAuth';
import type { EvCall } from '../EvCall';
import type { EvStorage } from '../EvStorage';

export interface State {
  requeuing: boolean;
  selectedQueueGroupId: string;
  selectedGateId: string;
  stayOnCall: boolean;
}

export interface EvRequeueCallOptions {
  //
}

export interface Deps {
  storage: EvStorage;
  evClient: EvClient;
  activeCallControl: EvActiveCallControl;
  evAuth: EvAuth;
  alert: Alert;
  evCall: EvCall;
  evRequeueCallOptions?: EvRequeueCallOptions;
}

export interface RequeueCall extends State {
  //
}
