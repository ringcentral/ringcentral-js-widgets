import { ForwardingNumberInfo } from '@rc-ex/core/definitions';
import { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { ForwardingNumber } from '@ringcentral-integration/commons/modules/ForwardingNumberV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';
import { RouterInteraction } from '../RouterInteraction';

export interface FlipUIOptions {}

export interface Deps {
  locale: Locale;
  webphone: Webphone;
  forwardingNumber: ForwardingNumber;
  regionSettings: RegionSettings;
  routerInteraction: RouterInteraction;
  flipUIOptions?: FlipUIOptions;
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
