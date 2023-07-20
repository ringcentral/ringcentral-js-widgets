import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import type { EvEnvironment } from '../../interfaces/Environment.interface';
import type { EvAuth } from '../EvAuth';
import type { EvCall } from '../EvCall';
import type { EvCallMonitor } from '../EvCallMonitor/EvCallMonitor';
import type { EvSettings } from '../EvSettings';
import type { EvWorkingState } from '../EvWorkingState';

export interface Deps {
  environment: EvEnvironment;
  evAuth: EvAuth;
  evCallMonitor: EvCallMonitor;
  evSettings: EvSettings;
  routerInteraction: RouterInteraction;
  evWorkingState: EvWorkingState;
  evCall: EvCall;
  locale: Locale;
}

export interface MainView {
  oldIntervalTime?: number;
}
