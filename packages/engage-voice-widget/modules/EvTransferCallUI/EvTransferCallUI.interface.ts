import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import type { EvEnvironment } from '../../interfaces/Environment.interface';
import type { EvAuth } from '../EvAuth';
import type { EvCall } from '../EvCall';
import type { EvRequeueCall } from '../EvRequeueCall';
import type { EvTransferCall } from '../EvTransferCall';

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
