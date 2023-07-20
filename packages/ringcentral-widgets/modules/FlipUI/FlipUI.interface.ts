import type ForwardingNumberInfo from '@rc-ex/core/lib/definitions/ForwardingNumberInfo';
import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumber';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import type { Webphone } from '@ringcentral-integration/commons/modules/Webphone';
import type { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import type { RouterInteraction } from '../RouterInteraction';

export interface FlipUIOptions {}

export interface Deps {
  locale: Locale;
  webphone: Webphone;
  forwardingNumber: ForwardingNumber;
  regionSettings: RegionSettings;
  routerInteraction: RouterInteraction;
  flipUIOptions?: FlipUIOptions;
  accountInfo: AccountInfo;
}

export interface FlipUIPanelProps {
  sessionId: string;
  isOnFlip: boolean;
  currentLocale: string;
  flipNumbers: ForwardingNumberInfo[];
  session: NormalizedSession;
  onFlip: (flipValue: string, sessionId: string) => Promise<void>;
  onComplete: (sessionId: string) => void;
  onBack: () => void;
  onCallEnd: () => void;
  formatPhone: (phoneNumber: string) => string;
}

export interface FlipUIContainerProps {
  params: { sessionId: string };
}
