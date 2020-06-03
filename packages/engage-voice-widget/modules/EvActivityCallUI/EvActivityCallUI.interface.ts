import Alert from 'ringcentral-integration/modules/Alert';
import ConnectivityMonitor from 'ringcentral-integration/modules/ConnectivityMonitor';
import Environment from 'ringcentral-integration/modules/Environment';
import Locale from 'ringcentral-integration/modules/Locale';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';
import Storage from 'ringcentral-integration/modules/Storage';
import TabManager from 'ringcentral-integration/modules/TabManager';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';

import { EvActiveCallControl } from '../EvActiveCallControl';
import { EvCall } from '../EvCall';
import { EvCallDisposition } from '../EvCallDisposition';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import { EvRequeueCall } from '../EvRequeueCall';
import { EvSessionConfig } from '../EvSessionConfig';
import { EvTransferCall } from '../EvTransferCall';
import { EvWorkingState } from '../EvWorkingState';
import { EvEnvironment } from '../../interfaces/Environment.interface';

export interface State {
  saveStatus: string;
  disabled: { [P: string]: any };
  required: { notes: boolean };
  validated: { dispositionId: boolean; notes: boolean };
}

export interface DepsModules {
  locale: Locale;
  alert: Alert;
  activeCallControl: EvActiveCallControl;
  evCall: EvCall;
  evCallMonitor: EvCallMonitor;
  evCallDisposition: EvCallDisposition;
  evRequeueCall: EvRequeueCall;
  evTransferCall: EvTransferCall;
  evWorkingState: EvWorkingState;
  evSessionConfig: EvSessionConfig;
  evIntegratedSoftphone: EvIntegratedSoftphone;
  routerInteraction: RouterInteraction;
  connectivityMonitor: ConnectivityMonitor;
  rateLimiter: RateLimiter;
  environment: EvEnvironment;
  storage: Storage;
  tabManager: TabManager;
}

export interface ActivityCallUI extends State {
  //
}
