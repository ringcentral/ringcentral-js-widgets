import { LoginTypes } from '../enums';
import { EvAvailableSkillProfile } from '../lib/EvClient';

export interface SkillProfile {
  label: string;
  id: string;
}

export interface LoginType {
  label: string;
  id: string;
}

export interface EvSessionConfigUIProps {
  currentLocale: string;
  selectedSkillProfileId: string;
  skillProfileList: EvAvailableSkillProfile[];
  loginType: string;
  loginTypeList: LoginType[];
  extensionNumber: string;
  takingCall: boolean;
  autoAnswer: boolean;
  /** Is that have extension number TextField */
  isExtensionNumber: boolean;
  isLoading: boolean;
  inboundQueuesFieldText: string;
}

export interface EvSessionConfigUIFunctions {
  navigateToInboundQueuesPage(): void;
  setSkillProfileId: (skillProfile: string) => void;
  setLoginType: (loginType: LoginTypes) => void;
  setExtensionNumber: (extensionNumber: string) => void;
  setTakingCall: (takingCall: boolean) => void;
  setAutoAnswer: (autoAnswer: boolean) => void;
  setConfigure: () => Promise<void>;
}
