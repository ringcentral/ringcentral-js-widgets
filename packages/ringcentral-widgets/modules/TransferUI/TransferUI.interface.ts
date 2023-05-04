import { NormalizedSession } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import {
  ActiveCallControl,
  ActiveSession,
} from '@ringcentral-integration/commons/modules/ActiveCallControl';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { Webphone } from '@ringcentral-integration/commons/modules/Webphone';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';

import { Alert } from '@ringcentral-integration/commons/modules/Alert';
import { CallingSettings } from '@ringcentral-integration/commons/modules/CallingSettings';
import { CompanyContacts } from '@ringcentral-integration/commons/modules/CompanyContacts';
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
