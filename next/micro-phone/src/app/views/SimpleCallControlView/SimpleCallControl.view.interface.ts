import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import type { ActiveSession } from '@ringcentral-integration/commons/modules/ActiveCallControl';
import type { SimpleCallControlPanel } from '@ringcentral-integration/widgets/components/SimpleCallControlPanel';

export interface SimpleCallControlViewOptions {
  component?: typeof SimpleCallControlPanel;
}

export interface SimpleCallControlContainerProps {
  renderContactName?: (options: {
    sessionId?: string;
    telephonySessionId: string;
  }) => string;
}

export type IParams = {
  sessionId?: string;
};

export interface SimpleCallControlViewProps {
  //
}

export interface SimpleCallControlPageProps {
  currentLocale: string;
  activeSession: Partial<ActiveSession> | undefined | null;
  sessionId: string;
  areaCode: string;
  countryCode: string;
  phoneNumber: string;
  fallBackName: string;
  brandName: string;
  controlBusy: boolean;
  showContactDisplayPlaceholder?: boolean;
  nameMatches: Entity[];
  onBackButtonClick: () => void;
  onTransfer: (sessionId: string) => void;
  onMute: () => void;
  onUnmute: () => void;
  onHold: () => void;
  onUnhold: () => void;
  onHangup: () => void;
  maxExtensionNumberLength?: number;
}
