import Alert from 'ringcentral-integration/modules/Alert';
import Storage from 'ringcentral-integration/modules/Storage';

import { EvClient } from '../../lib/EvClient';
import { EvActiveCallControl } from '../EvActiveCallControl';
import { EvAuth } from '../EvAuth';
import { EvCall } from '../EvCall';

export interface State {
  requeuing: boolean;
  selectedQueueGroupId: string;
  selectedGateId: string;
  stayOnCall: boolean;
}

export interface DepsModules {
  storage: Storage;
  evClient: EvClient;
  activeCallControl: EvActiveCallControl;
  evAuth: EvAuth;
  alert: Alert;
  evCall: EvCall;
}

export interface RequeueCall extends State {
  //
}
