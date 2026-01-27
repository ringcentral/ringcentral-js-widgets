import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type CallBadge from '@ringcentral-integration/widgets/components/CallBadge';

export interface CallBadgeViewOptions {
  component?: typeof CallBadge;
}

export interface CallBadgePanelProps {
  hidden: boolean;
  defaultOffsetX: number;
  defaultOffsetY: number;
  session: Partial<NormalizedSession>;
  currentLocale: string;
  goToCallCtrl: () => void;
  toggleMinimized: (id: string) => Promise<void>;
}

export interface CallBadgeViewProps {
  hidden: boolean;
  defaultOffsetX?: number;
  defaultOffsetY?: number;
  goToCallCtrl: () => void;
}
