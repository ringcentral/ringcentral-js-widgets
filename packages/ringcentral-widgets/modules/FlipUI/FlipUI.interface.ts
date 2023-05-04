import type ForwardingNumberInfo from '@rc-ex/core/lib/definitions/ForwardingNumberInfo';
import { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumber';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { Webphone } from '@ringcentral-integration/commons/modules/Webphone';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import { RouterInteraction } from '../RouterInteraction';

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
