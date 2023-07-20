import type { FunctionComponent } from 'react';

import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import type { EvAuth } from '../EvAuth';
import type { EvCall } from '../EvCall';

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
