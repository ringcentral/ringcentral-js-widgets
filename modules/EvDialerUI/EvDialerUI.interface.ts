import Locale from 'ringcentral-integration/modules/Locale';

import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';

import { EvEnvironment } from '../../interfaces/Environment.interface';
import { EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';
import { EvCall } from '../EvCall';
import { EvCallMonitor } from '../EvCallMonitor';
import { EvIntegratedSoftphone } from '../EvIntegratedSoftphone';
import { EvSettings } from '../EvSettings';
import { EvStorage } from '../EvStorage';
import { EvWorkingState } from '../EvWorkingState';

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
  evDialerUIOptions?: EvDialerUIOptions;
}

export interface DialerUI extends State {
  //
}
