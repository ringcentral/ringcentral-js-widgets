import Locale from 'ringcentral-integration/modules/Locale';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';

import { EvActiveCallControl } from '../EvActiveCallControl';
import { EvCall } from '../EvCall';
import { EvCallMonitor } from '../EvCallMonitor';

interface State {
  //
}

export interface DepsModules {
  routerInteraction: RouterInteraction;
  locale: Locale;
  activeCallControl: EvActiveCallControl;
  evCallMonitor: EvCallMonitor;
  evCall: EvCall;
}

export interface ActiveCallListUI extends State {
  //
}
