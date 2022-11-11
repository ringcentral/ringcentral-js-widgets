import { Alert } from '@ringcentral-integration/commons/modules/Alert';
import { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import { EvEnvironment } from '../../interfaces/Environment.interface';
import { EvActiveCallControl } from '../EvActiveCallControl';
import { EvAgentScript } from '../EvAgentScript';
import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';
import { EvCall } from '../EvCall';
import { EvCallDisposition } from '../EvCallDisposition';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import { EvRequeueCall } from '../EvRequeueCall';
import { EvStorage } from '../EvStorage';
import { EvTabManager } from '../EvTabManager';
import { EvTransferCall } from '../EvTransferCall';
import { EvWorkingState } from '../EvWorkingState';

export interface State {
  saveStatus: string;
  disabled: { [P: string]: any };
  required: { notes: boolean };
  validated: { dispositionId: boolean; notes: boolean };
}

export interface EvActivityCallUIOptions {
  //
}

export interface Deps {
  locale: Locale;
  alert: Alert;
  activeCallControl: EvActiveCallControl;
  evCall: EvCall;
  evAgentScript: EvAgentScript;
  evCallMonitor: EvCallMonitor;
  evCallDisposition: EvCallDisposition;
  evRequeueCall: EvRequeueCall;
  evTransferCall: EvTransferCall;
  evWorkingState: EvWorkingState;
  evAgentSession: EvAgentSession;
  evIntegratedSoftphone: EvIntegratedSoftphone;
  routerInteraction: RouterInteraction;
  connectivityMonitor: ConnectivityMonitor;
  rateLimiter: RateLimiter;
  environment: EvEnvironment;
  storage: EvStorage;
  evAuth: EvAuth;
  tabManager?: EvTabManager;
  evActivityCallUIOptions?: EvActivityCallUIOptions;
}

export interface ActivityCallUI extends State {
  //
}
