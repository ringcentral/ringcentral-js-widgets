import Locale from 'ringcentral-integration/modules/Locale';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';

import { EvEnvironment } from '../../interfaces/Environment.interface';
import { EvAuth } from '../EvAuth';
import { EvCall } from '../EvCall';
import { EvRequeueCall } from '../EvRequeueCall';
import { EvTransferCall } from '../EvTransferCall';

export interface State {
  //
}

export interface EvTransferCallUIOptions {
  //
}

export interface Deps {
  locale: Locale;
  routerInteraction: RouterInteraction;
  evTransferCall: EvTransferCall;
  evAuth: EvAuth;
  evCall: EvCall;
  evRequeueCall: EvRequeueCall;
  environment: EvEnvironment;
  evTransferCallUIOptions?: EvTransferCallUIOptions;
}

export interface TransferCallUI extends State {
  //
}
