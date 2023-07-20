import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import type { EvClient } from '../../lib/EvClient';
import type { EvActiveCallControl } from '../EvActiveCallControl';
import type { EvAgentSession } from '../EvAgentSession';
import type { EvAuth } from '../EvAuth';
import type { EvCall } from '../EvCall';
import type { EvCallMonitor } from '../EvCallMonitor';
import type { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';

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
