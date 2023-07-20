import type { Alert } from '@ringcentral-integration/commons/modules/Alert';
import type { Auth as RcAuth } from '@ringcentral-integration/commons/modules/Auth';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { Block } from '@ringcentral-integration/widgets/modules/Block';
import type RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import type { EvAgentData, EvClient, EvTokenType } from '../../lib/EvClient';
import type { EvSubscription } from '../EvSubscription';
import type { EvTabManager } from '../EvTabManager';

export interface EvAuthOptions {
  //
}

export interface Deps {
  locale: Locale;
  alert: Alert;
  routerInteraction: RouterInteraction;
  evClient: EvClient;
  auth: RcAuth;
  block: Block;
  evSubscription: EvSubscription;
  tabManager?: EvTabManager;
  evAuthOptions?: EvAuthOptions;
}

export interface State {
  connecting: boolean;
  connected: boolean;
  agent: EvAgentData;
}

export interface Auth extends State {
  setConnectionData(connection: State): void;
}

export interface AuthenticateWithTokenType {
  rcAccessToken?: string;
  tokenType?: EvTokenType;
  shouldEmitAuthSuccess?: boolean;
}
