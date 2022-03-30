import { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import {
  ActiveCallControl,
  ActiveSession,
} from '@ringcentral-integration/commons/modules/ActiveCallControlV2';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearchV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';

import { RouterInteraction } from '../RouterInteraction';

export interface TransferUIOptions {}

export interface Deps {
  locale: Locale;
  regionSettings: RegionSettings;
  routerInteraction: RouterInteraction;
  contactSearch: ContactSearch;
  webphone: Webphone;
  activeCallControl: ActiveCallControl;
  TransferUIOptions?: TransferUIOptions;
}

export interface TransferUIPanelProps {
  sessionId: string;
  currentLocale: string;
  searchContactList: {
    id: string;
    name: string;
    phoneNumber: string;
  }[];
  session: ActiveSession | NormalizedSession;
  controlBusy: boolean;
  enableWarmTransfer: boolean;
  setActiveSessionId: (sessionId: string) => void;
  onTransfer: (transferNumber: string, sessionId: string) => void;
  onWarmTransfer: (transferNumber: string, sessionId: string) => void;
  onBack: () => void;
  onCallEnd: () => void;
  formatPhone: (phoneNumber: string) => string;
  searchContact: (searchString: string) => void;
}

export interface TransferUIContainerProps {
  params: { sessionId?: string; type?: string };
  enableWarmTransfer?: boolean;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
}
