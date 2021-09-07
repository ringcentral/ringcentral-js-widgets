import Alert from '@ringcentral-integration/commons/modules/Alert';
import { Auth } from '@ringcentral-integration/commons/modules/AuthV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { Beforeunload } from '@ringcentral-integration/widgets/modules/Beforeunload';
import { Block } from '@ringcentral-integration/widgets/modules/Block';
import { ModalUI } from '@ringcentral-integration/widgets/modules/ModalUIV2';
import RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import { EvClient } from '../../lib/EvClient';
import { EvAgentSession } from '../EvAgentSession';
import { EvAuth } from '../EvAuth';
import { EvPresence } from '../EvPresence';
import { EvSettings } from '../EvSettings';
import { EvStorage } from '../EvStorage';
import { EvSubscription } from '../EvSubscription';
import { EvTabManager } from '../EvTabManager';

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
