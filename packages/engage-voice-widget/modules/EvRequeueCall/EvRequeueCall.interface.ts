import Alert from '@ringcentral-integration/commons/modules/Alert';

import { EvClient } from '../../lib/EvClient';
import { EvActiveCallControl } from '../EvActiveCallControl';
import { EvAuth } from '../EvAuth';
import { EvCall } from '../EvCall';
import { EvStorage } from '../EvStorage';

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
