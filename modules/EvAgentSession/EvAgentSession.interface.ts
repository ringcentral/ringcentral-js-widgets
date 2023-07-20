import type { Alert } from '@ringcentral-integration/commons/modules/Alert';
import type { Auth } from '@ringcentral-integration/commons/modules/Auth';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { Beforeunload } from '@ringcentral-integration/widgets/modules/Beforeunload';
import type { Block } from '@ringcentral-integration/widgets/modules/Block';
import type { ModalUI } from '@ringcentral-integration/widgets/modules/ModalUI';
import type RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import type { LoginTypes } from '../../enums';
import type { EvClient } from '../../lib/EvClient';
import type { EvAuth } from '../EvAuth';
import type { EvCallDataSource } from '../EvCallDataSource';
import type { EvPresence } from '../EvPresence';
import type { EvStorage } from '../EvStorage';
import type { EvTabManager } from '../EvTabManager';

export interface EvAgentSessionOptions {}

export type FormGroup = Partial<
  Pick<
    State,
    | 'selectedInboundQueueIds'
    | 'loginType'
    | 'selectedSkillProfileId'
    | 'extensionNumber'
    | 'autoAnswer'
  >
>;

export interface Deps {
  evAuth: EvAuth;
  evClient: EvClient;
  storage: EvStorage;
  alert: Alert;
  auth: Auth;
  modalUI: ModalUI;
  locale: Locale;
  tabManager?: EvTabManager;
  evCallDataSource: EvCallDataSource;
  evAgentSessionOptions?: EvAgentSessionOptions;
  routerInteraction: RouterInteraction;
  block: Block;
  presence: EvPresence;
  beforeunload: Beforeunload;
}

export interface State {
  selectedInboundQueueIds: string[];
  selectedSkillProfileId: string;
  loginType: LoginTypes;
  extensionNumber: string;
  takingCall: boolean;
  autoAnswer: boolean;
  configSuccess: boolean;
  configured: boolean;
  tabManagerEnabled: boolean;
}

export interface AgentSession extends State {
  setLoginType(loginType: LoginTypes): void;
  setInboundQueueIds(ids: string[]): void;
  setSkillProfileId(skillProfile: string): void;
  setExtensionNumber(extensionNumber: string): void;
  setTakingCall(takingCall: boolean): void;
  setAutoAnswer(autoAnswer: boolean): void;
  setConfigSuccess(configSuccess: boolean): void;
}
