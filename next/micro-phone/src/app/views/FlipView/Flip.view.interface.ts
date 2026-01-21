import type ForwardingNumberInfo from '@rc-ex/core/lib/definitions/ForwardingNumberInfo';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type FlipPanel from '@ringcentral-integration/widgets/components/FlipPanel';

export interface FlipViewOptions {
  component?: typeof FlipPanel;
}

export interface FlipViewPanelProps {
  sessionId: string;
  isOnFlip: boolean;
  currentLocale: string;
  flipNumbers: ForwardingNumberInfo[];
  session: NormalizedSession | null;
  onFlip: (flipValue: string, sessionId: string) => Promise<void>;
  onComplete: (sessionId: string) => void;
  onBack: () => void;
  onCallEnd: () => void;
  formatPhone: (phoneNumber: string) => string;
}

export interface FlipViewProps {
  //
}
