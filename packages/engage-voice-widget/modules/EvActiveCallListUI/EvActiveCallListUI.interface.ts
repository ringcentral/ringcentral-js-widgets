import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import { EvClient } from '../../lib/EvClient';
import { EvActiveCallControl } from '../EvActiveCallControl';
import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';
import { EvCall } from '../EvCall';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';

interface State {
  //
}

export interface EvActiveCallListUIOptions {
  //
}

export interface Deps {
  routerInteraction: RouterInteraction;
  locale: Locale;
  activeCallControl: EvActiveCallControl;
  evCallMonitor: EvCallMonitor;
  evCall: EvCall;
  evIntegratedSoftphone: EvIntegratedSoftphone;
  evAgentSession: EvAgentSession;
  evAuth: EvAuth;
  evClient: EvClient;
  evActiveCallListUIOptions?: EvActiveCallListUIOptions;
}

export interface ActiveCallListUI extends State {
  //
}
