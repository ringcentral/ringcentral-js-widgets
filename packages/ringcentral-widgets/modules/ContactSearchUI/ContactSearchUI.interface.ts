import { ComponentType } from 'react';

import { AccountContacts } from '@ringcentral-integration/commons/modules/AccountContacts';
import { AddressBook } from '@ringcentral-integration/commons/modules/AddressBook';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearch';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import {
  ContactPresence,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { Contacts } from '@ringcentral-integration/commons/modules/Contacts';
import { RouterInteraction } from '../RouterInteraction';
import { TabsEnumType } from '../../components/ContactSearchPanel/ContactSearchPanelEnum';
import { GetPresenceFn } from '../../react-hooks/usePresence';

export interface ContactSearchUIOptions {
  centered?: boolean;
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
  inputRef: React.RefObject<HTMLInputElement>;
  userInput: string;
  directlyProceedText: string;
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
  contact: IContact & { presence?: ContactPresence };
}

export interface ContactSearchPanelProps extends PageProps {
  currentLocale: string;
  centered?: boolean;
  companyContacts: IContactSearchItem[];
  personalContacts: IContactSearchItem[];
  thirdPartyContacts?: IContactSearchItem[];
  thirdPartySourceName: string;
  minimumSearchLength?: number;
  isThirdPartySearching: boolean;
  directlyProceedText: string;
  defaultTab?: TabsEnumType;
  searchHandler: (searchString: string) => Promise<any>;
  setFilterString: (filterString: string) => void;
  formatPhone: (phoneNumber: string) => string | undefined;
  getCompanyExtraInfoByIds: (ids: string[]) => void;
  changeTabTrack: (v: string) => void;
  getPresence: GetPresenceFn;
  ThirdPartyAvatar?: ComponentType<{
    type?: string;
  }>;
}
