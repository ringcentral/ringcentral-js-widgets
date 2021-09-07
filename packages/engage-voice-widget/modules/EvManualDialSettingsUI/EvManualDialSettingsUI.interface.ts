import { FunctionComponent } from 'react';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import { EvAuth } from '../EvAuth';
import { EvCall } from '../EvCall';

interface State {
  //
}

export interface Deps {
  locale: Locale;
  routerInteraction: RouterInteraction;
  evAuth: EvAuth;
  evCall: EvCall;
}

export interface ManualDialSettingsUI extends State {
  //
}

export interface EvManualDialSettingsRenderProps {
  renderCallerIdLabel?: FunctionComponent<any>;
  renderQueueLabel?: FunctionComponent<any>;
}
