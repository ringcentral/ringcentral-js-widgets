import Alert from 'ringcentral-integration/modules/Alert';
import Auth from 'ringcentral-integration/modules/Auth';
import Locale from 'ringcentral-integration/modules/Locale';
import RegionSettings from 'ringcentral-integration/modules/RegionSettings';
import Storage from 'ringcentral-integration/modules/Storage';
import TabManager from 'ringcentral-integration/modules/TabManager';
import { Modal } from 'ringcentral-widgets/modules/Modal';

import { LoginTypes } from '../../enums';
import { EvClient } from '../../lib/EvClient';
import { EvAuth } from '../EvAuth';

export interface DepsModules {
  evAuth: EvAuth;
  evClient: EvClient;
  storage: Storage;
  alert: Alert;
  auth: Auth;
  modal: Modal;
  locale: Locale;
  regionSettings: RegionSettings;
  tabManager?: TabManager;
}

export interface State {
  selectedInboundQueueIds: string[];
  selectedSkillProfileId: string;
  loginType: string;
  extensionNumber: string;
  takingCall: boolean;
  autoAnswer: boolean;
  configSuccess: boolean;
  configured: boolean;
}

export interface SessionConfig extends State {
  setLoginType(loginType: LoginTypes): void;
  setInboundQueueIds(ids: string[]): void;
  setSkillProfileId(skillProfile: string): void;
  setExtensionNumber(extensionNumber: string): void;
  setTakingCall(takingCall: boolean): void;
  setAutoAnswer(autoAnswer: boolean): void;
  setConfigSuccess(configSuccess: boolean): void;
}
