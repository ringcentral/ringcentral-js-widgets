import { Entity } from 'ringcentral-integration/interfaces/Entity.interface';
import { ActiveSession } from 'ringcentral-integration/modules/ActiveCallControlV2';

export interface SimpleCallControlPanelProps {
  currentLocale: string;
  activeSession: ActiveSession;
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
  setActiveSessionId: (sessionId: string) => void;
  onTransfer: (sessionId: string) => void;
  onMute: () => void;
  onUnmute: () => void;
  onHold: () => void;
  onUnhold: () => void;
  onHangup: () => void;
}
