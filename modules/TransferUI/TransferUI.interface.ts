import type { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import type {
  ActiveCallControl,
  ActiveSession,
} from '@ringcentral-integration/commons/modules/ActiveCallControl';
import type { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import type { Webphone } from '@ringcentral-integration/commons/modules/Webphone';
import type { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';

import type { Alert } from '@ringcentral-integration/commons/modules/Alert';
import type { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import type { CompanyContacts } from '@ringcentral-integration/commons/modules/CompanyContacts';
import type { RouterInteraction } from '../RouterInteraction';

export interface TransferUIOptions {}

export interface Deps {
  locale: Locale;
  regionSettings: RegionSettings;
  routerInteraction: RouterInteraction;
  contactSearch: ContactSearch;
  webphone: Webphone;
  activeCallControl: ActiveCallControl;
  TransferUIOptions?: TransferUIOptions;
  accountInfo: AccountInfo;
  alert: Alert;
  callingSettings: CallingSettings;
  companyContacts: CompanyContacts;
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
  onToVoicemail: (voicemailId: string, sessionId: string) => void;
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
