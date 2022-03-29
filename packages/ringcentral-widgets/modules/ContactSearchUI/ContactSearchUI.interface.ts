import { AccountContacts } from '@ringcentral-integration/commons/modules/AccountContactsV2';
import { AddressBook } from '@ringcentral-integration/commons/modules/AddressBookV2';
import { ContactSearch } from '@ringcentral-integration/commons/modules/ContactSearchV2';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';

import { Locale } from '@ringcentral-integration/commons/modules/Locale';

export interface Deps {
  locale: Locale;
  accountContacts: AccountContacts;
  addressBook: AddressBook;
  contactSearch?: ContactSearch;
  regionSettings: RegionSettings;
}

export interface PageProps {
  optionClickHandler: (item: IContactSearchItem) => any;
  inputRef: React.RefObject<HTMLInputElement>;
  userInput: string;
}

export interface IContactSearchItem {
  isPrimary: boolean;
  id: string;
  type: string;
  name: string;
  phoneNumber: string;
  phoneType: string;
  presence?: string;
  profileImageUrl?: string;
  doNotCall?: string;
}

export interface ContactSearchPanelProps extends PageProps {
  currentLocale: string;
  companyContacts: IContactSearchItem[];
  personalContacts: IContactSearchItem[];
  searchHandler: (searchString: string) => Promise<any>;
  setFilterString: (filterString: string) => void;
  thirdPartyContacts?: IContactSearchItem[];
  thirdPartySourceName?: string;
  formatPhone: (phoneNumber: string) => string;
}
