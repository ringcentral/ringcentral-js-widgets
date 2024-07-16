import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { ActiveSession } from '@ringcentral-integration/commons/modules/ActiveCallControl';

export interface SimpleCallControlPanelProps {
  currentLocale: string;
  activeSession: Partial<ActiveSession> | undefined | null;
  sessionId: string;
  areaCode: string;
  countryCode: string;
  phoneNumber: string;
  fallBackName: string;
  brandName: string;
  controlBusy: boolean;
  actions?: string[];
  showContactDisplayPlaceholder?: boolean;
  nameMatches: Entity[];
  onBackButtonClick: () => void;
  setActiveSessionId?: (sessionId: string) => void;
  onTransfer: (sessionId: string) => void;
  onMute: () => void;
  onUnmute: () => void;
  onHold: () => void;
  onUnhold: () => void;
  onHangup: () => void;
  maxExtensionNumberLength?: number;
}
