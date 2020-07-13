import Locale from 'ringcentral-integration/modules/Locale';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';

import { EvEnvironment } from '../../interfaces/Environment.interface';
import { EvClient } from '../../lib/EvClient';
import { EvAuth } from '../EvAuth';
import { EvCall } from '../EvCall';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import { EvSessionConfig } from '../EvSessionConfig';
import { EvSettings } from '../EvSettings';
import { EvWorkingState } from '../EvWorkingState';

export interface State {
  toNumber: string;
  latestDialoutNumber: string;
}

export interface DepsModules {
  evCall: EvCall;
  locale: Locale;
  evAuth: EvAuth;
  routerInteraction: RouterInteraction;
  evSettings: EvSettings;
  evClient: EvClient;
  evCallMonitor: EvCallMonitor;
  evWorkingState: EvWorkingState;
  evSessionConfig: EvSessionConfig;
  evIntegratedSoftphone: EvIntegratedSoftphone;
  environment: EvEnvironment;
}

export interface DialerUI extends State {
  //
}
