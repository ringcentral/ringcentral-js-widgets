import type { LoginTypes } from '../enums';
import type { EvAgent, EvAvailableSkillProfile } from '../lib/EvClient';
import type { AvailableQueue } from './SelectableQueue.interface';

export interface SkillProfile {
  label: string;
  id: string;
}

export interface LoginType {
  label: string;
  id: string;
}

export interface EvAgentSessionUIProps {
  currentLocale: string;
  selectedSkillProfileId: string;
  skillProfileList: EvAvailableSkillProfile[];
  loginType: string;
  loginTypeList: LoginType[];
  extensionNumber: string;
  // takingCall: boolean;
  autoAnswer: boolean;
  /** Is that have extension number TextField */
  isExtensionNumber: boolean;
  isLoading: boolean;
  inboundQueuesFieldText: string;
  // Inboudqueue Panel
  inboundQueues: AvailableQueue[];
  showAutoAnswer: boolean;
  showInboundQueues: boolean;
  showSkillProfile: boolean;
  selectedAgent: EvAgent;
  showReChooseAccount: boolean;
}

/** this is panel state with hook */
export type ChangeQueueStateFn = (queues: AvailableQueue[]) => void;

export interface EvAgentSessionUIFunctions {
  setSkillProfileId: (skillProfile: string) => void;
  setLoginType: (loginType: LoginTypes) => void;
  setExtensionNumber: (extensionNumber: string) => void;
  // setTakingCall: (takingCall: boolean) => void;
  setAutoAnswer: (autoAnswer: boolean) => void;
  setConfigure: () => Promise<void>;
  goToSettingsPage: () => void;
  goToSettingsPageWhetherSessionChanged: () => void;
  onSaveUpdate: () => void;
  // Inboudqueue Panel
  searchOption: (option: AvailableQueue, text: string) => boolean;
  submitInboundQueues: (queues: AvailableQueue[], cb: () => void) => void;
  goBack: () => void;
  getAssignedInboundQueues: (
    inboundQueues: AvailableQueue[],
  ) => AvailableQueue[];
  isAllAssign: (
    assignedInboundQueues: AvailableQueue[],
    inboundQueues: AvailableQueue[],
  ) => boolean;
  isSeveralAssign: (
    assignedInboundQueues: AvailableQueue[],
    inboundQueues: AvailableQueue[],
  ) => boolean;
  checkBoxOnChange: (
    gateId: string,
    inboundQueuesState: AvailableQueue[],
    /** this is panel state with hook */
    setInboundQueuesState: ChangeQueueStateFn,
  ) => void;
  allCheckBoxOnChange: (
    severalAssign: boolean,
    inboundQueuesState: AvailableQueue[],
    /** this is panel state with hook */
    setInboundQueuesState: ChangeQueueStateFn,
  ) => void;
  onAccountReChoose: () => void | Promise<void>;
}

export type BasicSessionProps = Pick<
  EvAgentSessionUIProps & EvAgentSessionUIFunctions,
  | 'autoAnswer'
  | 'currentLocale'
  | 'selectedSkillProfileId'
  | 'skillProfileList'
  | 'loginTypeList'
  | 'loginType'
  | 'extensionNumber'
  | 'inboundQueuesFieldText'
  | 'isExtensionNumber'
  | 'showAutoAnswer'
  | 'showSkillProfile'
  | 'showInboundQueues'
  | 'setSkillProfileId'
  | 'setLoginType'
  | 'setAutoAnswer'
  | 'setExtensionNumber'
>;
