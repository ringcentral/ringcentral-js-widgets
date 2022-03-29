import { Alert } from '@ringcentral-integration/commons/modules/Alert';
import { Auth } from '@ringcentral-integration/commons/modules/AuthV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { Beforeunload } from '@ringcentral-integration/widgets/modules/Beforeunload';
import { Block } from '@ringcentral-integration/widgets/modules/Block';
import { ModalUI } from '@ringcentral-integration/widgets/modules/ModalUI';
import RouterInteraction from '@ringcentral-integration/widgets/modules/RouterInteraction';

import { LoginTypes } from '../../enums';
import { EvClient } from '../../lib/EvClient';
import { EvAuth } from '../EvAuth';
import { EvCallDataSource } from '../EvCallDataSource';
import { EvPresence } from '../EvPresence';
import { EvStorage } from '../EvStorage';
import { EvTabManager } from '../EvTabManager';

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
