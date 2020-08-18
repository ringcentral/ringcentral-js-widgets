import Alert from 'ringcentral-integration/modules/Alert';
import { Auth } from 'ringcentral-integration/modules/AuthV2';
import Locale from 'ringcentral-integration/modules/Locale';
import RegionSettings from 'ringcentral-integration/modules/RegionSettings';
import Storage from 'ringcentral-integration/modules/Storage';
import TabManager from 'ringcentral-integration/modules/TabManager';
import { Block } from 'ringcentral-widgets/modules/Block';
import { Modal } from 'ringcentral-widgets/modules/Modal';
import RouterInteraction from 'ringcentral-widgets/modules/RouterInteraction';

import { LoginTypes } from '../../enums';
import { EvClient } from '../../lib/EvClient';
import { EvAuth } from '../EvAuth';

export interface EvAgentSessionOptions {
  heartBeatInterval?: number;
}

export type FormGroup = Partial<
  Pick<
    AgentSession,
    | 'selectedInboundQueueIds'
    | 'loginType'
    | 'selectedSkillProfileId'
    | 'extensionNumber'
  >
>;

export interface Deps {
  evAuth: EvAuth;
  evClient: EvClient;
  storage: Storage;
  alert: Alert;
  auth: Auth;
  modal: Modal;
  locale: Locale;
  regionSettings: RegionSettings;
  tabManager?: TabManager;
  evAgentSessionOptions?: EvAgentSessionOptions;
  routerInteraction: RouterInteraction;
  block: Block;
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
