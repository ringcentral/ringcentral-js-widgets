import type { Alert } from '@ringcentral-integration/commons/modules/Alert';
import type { Auth } from '@ringcentral-integration/commons/modules/Auth';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { Beforeunload } from '@ringcentral-integration/widgets/modules/Beforeunload';
import type { Block } from '@ringcentral-integration/widgets/modules/Block';
import type { ModalUI } from '@ringcentral-integration/widgets/modules/ModalUI';
import type RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import type { EvClient } from '../../lib/EvClient';
import type { EvAgentSession } from '../EvAgentSession';
import type { EvAuth } from '../EvAuth';
import type { EvPresence } from '../EvPresence';
import type { EvSettings } from '../EvSettings';
import type { EvStorage } from '../EvStorage';
import type { EvSubscription } from '../EvSubscription';
import type { EvTabManager } from '../EvTabManager';

export interface State {
  // dtmfString: string;
  connectingAlertId: string;
  muteActive: boolean;
  sipRegisterSuccess: boolean;
  sipRegistering: boolean;
}

export interface EvIntegratedSoftphoneOptions {}

export interface Deps {
  routerInteraction: RouterInteraction;
  locale: Locale;
  evAgentSession: EvAgentSession;
  evSubscription: EvSubscription;
  beforeunload: Beforeunload;
  evSettings: EvSettings;
  evClient: EvClient;
  storage: EvStorage;
  presence: EvPresence;
  modalUI: ModalUI;
  alert: Alert;
  block: Block;
  evAuth: EvAuth;
  auth: Auth;
  tabManager?: EvTabManager;
  evIntegratedSoftphoneOptions?: EvIntegratedSoftphoneOptions;
}

export interface IntegratedSoftphone extends State {
  isWebRTCTab: boolean;
}

export type ShowRingingModalProps = {
  displayName: string;
  queueName: string;
  isInbound: boolean;
};
