import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import type { EvEnvironment } from '../../interfaces/Environment.interface';
import type { EvClient } from '../../lib/EvClient';
import type { EvActivityCallUI } from '../EvActivityCallUI';
import type { EvAgentSession } from '../EvAgentSession';
import type { EvAuth } from '../EvAuth';
import type { EvCall } from '../EvCall';
import type { EvCallMonitor } from '../EvCallMonitor';
import type { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import type { EvSettings } from '../EvSettings';
import type { EvStorage } from '../EvStorage';
import type { EvWorkingState } from '../EvWorkingState';

export interface State {
  toNumber: string;
  latestDialoutNumber: string;
}

export interface EvDialerUIOptions {
  //
}

export interface Deps {
  evCall: EvCall;
  locale: Locale;
  evAuth: EvAuth;
  storage: EvStorage;
  routerInteraction: RouterInteraction;
  evSettings: EvSettings;
  evClient: EvClient;
  evCallMonitor: EvCallMonitor;
  evWorkingState: EvWorkingState;
  evAgentSession: EvAgentSession;
  evIntegratedSoftphone: EvIntegratedSoftphone;
  environment: EvEnvironment;
  evActivityCallUI: EvActivityCallUI;
  evDialerUIOptions?: EvDialerUIOptions;
}

export interface DialerUI extends State {
  //
}
