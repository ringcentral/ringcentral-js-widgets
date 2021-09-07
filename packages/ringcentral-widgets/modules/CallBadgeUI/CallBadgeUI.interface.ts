import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';
import { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';

export interface CallBadgeUIOptions {
  //
}

export interface Deps {
  locale: Locale;
  webphone: Webphone;
  callBadgeUIOptions?: CallBadgeUIOptions;
}

export interface CallBadgeContainerProps {
  hidden: boolean;
  defaultOffsetX?: number;
  defaultOffsetY?: number;
  goToCallCtrl: () => void;
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
