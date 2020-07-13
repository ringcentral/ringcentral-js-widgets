import Locale from 'ringcentral-integration/modules/Locale';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';

import { EvActiveCallControl } from '../EvActiveCallControl';
import { EvCall } from '../EvCall';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import { EvSessionConfig } from '../EvSessionConfig';
import { EvAuth } from '../EvAuth';
import { EvClient } from '../../lib/EvClient';

interface State {
  //
}

export interface DepsModules {
  routerInteraction: RouterInteraction;
  locale: Locale;
  activeCallControl: EvActiveCallControl;
  evCallMonitor: EvCallMonitor;
  evCall: EvCall;
  evIntegratedSoftphone: EvIntegratedSoftphone;
  evSessionConfig: EvSessionConfig;
  evAuth: EvAuth;
  evClient: EvClient;
}

export interface ActiveCallListUI extends State {
  //
}
