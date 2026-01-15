import type {
  ContactPresence,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import type { AccountContacts } from '@ringcentral-integration/commons/modules/AccountContacts';
import type { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import type { AddressBook } from '@ringcentral-integration/commons/modules/AddressBook';
import type { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import type { Contacts } from '@ringcentral-integration/commons/modules/Contacts';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import type { ComponentType } from 'react';

import type { TabsEnumType } from '../../components/ContactSearchPanel/ContactSearchPanelEnum';
import type { GetPresenceFn } from '../../react-hooks/usePresence';
import type { RouterInteraction } from '../RouterInteraction';

export interface ContactSearchUIOptions {
  centered?: boolean;
  filterCallQueueNumber?: boolean;
}

export interface Deps {
  locale: Locale;
  accountContacts: AccountContacts;
  addressBook: AddressBook;
  contactSearch?: ContactSearch;
  regionSettings: RegionSettings;
  accountInfo: AccountInfo;
  contactSearchUIOptions?: ContactSearchUIOptions;
  routerInteraction: RouterInteraction;
  contacts: Contacts;
}

export interface PageProps {
  optionClickHandler: (item: IContactSearchItem) => any;
  triggerEventTracking: (eventName: string, contactType: string) => any;
  inputRef: React.RefObject<HTMLInputElement>;
  userInput: string;
  directlyProceedText: string;
  filterCallQueueExtension?: boolean;
}

export interface IContactSearchItem {
  isPrimary: boolean;
  id: string;
  type: string;
  name: string;
  phoneNumber: string;
  phoneType: string;
  presenceStatus?: string;
  profileImageUrl?: string;
  doNotCall?: string;
  isDirectlyProceed?: boolean;
  accountName?: string;
  contact: IContact & { presence?: ContactPresence };
}

export interface ContactSearchPanelProps extends PageProps {
  currentLocale: string;
  centered?: boolean;
  showOtherContacts?: boolean;
  companyContacts: IContactSearchItem[];
  otherContacts: IContactSearchItem[];
  personalContacts: IContactSearchItem[];
  thirdPartyContacts?: IContactSearchItem[];
  thirdPartySourceName: string;
  minimumSearchLength?: number;
  isThirdPartySearching: boolean;
  directlyProceedText: string;
  defaultTab?: TabsEnumType;
  searchHandler: (searchString: string) => Promise<any>;
  setFilterString: (filterString: string) => void;
  formatPhone: (phoneNumber: string) => string | null | undefined;
  getCompanyExtraInfoByIds: (ids: string[]) => void;
  changeTabTrack: (v: string) => void;
  getPresence: GetPresenceFn;
  ThirdPartyAvatar?: ComponentType<{
    type?: string;
  }>;
}
