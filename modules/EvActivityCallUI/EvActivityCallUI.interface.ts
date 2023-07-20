import type { Alert } from '@ringcentral-integration/commons/modules/Alert';
import type { ConnectivityMonitor } from '@ringcentral-integration/commons/modules/ConnectivityMonitor';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RateLimiter } from '@ringcentral-integration/commons/modules/RateLimiter';
import type RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import type { EvEnvironment } from '../../interfaces/Environment.interface';
import type { EvActiveCallControl } from '../EvActiveCallControl';
import type { EvAgentScript } from '../EvAgentScript';
import type { EvAgentSession } from '../EvAgentSession';
import type { EvAuth } from '../EvAuth';
import type { EvCall } from '../EvCall';
import type { EvCallDisposition } from '../EvCallDisposition';
import type { EvCallMonitor } from '../EvCallMonitor';
import type { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import type { EvRequeueCall } from '../EvRequeueCall';
import type { EvStorage } from '../EvStorage';
import type { EvTabManager } from '../EvTabManager';
import type { EvTransferCall } from '../EvTransferCall';
import type { EvWorkingState } from '../EvWorkingState';

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
