import type {
  ContactPresence,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import type { ContactSearchPanel } from '@ringcentral-integration/widgets/components/ContactSearchPanel';
import type { GetPresenceFn } from '@ringcentral-integration/widgets/react-hooks/usePresence';
import type { SuggestionListItemData as BaseSuggestionListItemData } from '@ringcentral/spring-ui';
import type { FunctionComponent } from 'react';

export type TabsEnumType = 'personal' | 'company' | 'other' | 'thirdParty';

export interface ContactSearchViewOptions {
  centered?: boolean;
  /**
   * in spring-ui always be true
   *
   * TODO: should remove after all projects migrate to spring-ui
   */
  filterCallQueueNumber?: boolean;
  component?: typeof ContactSearchPanel;
  /**
   * non use in spring-ui projects
   *
   * TODO: if still needed, should add that logic back into spring-ui
   *
   * @deprecated
   */
  useSortedResult?: boolean;
  ThirdPartyAvatar?: FunctionComponent<{
    type?: string;
  }>;
  /**
   * helper text for the contact search view
   * @default undefined
   */
  helperText?: string;
  renderListItemSecondary?: (contact: IContactSearchItem) => React.ReactNode;
}

export interface ContactSearchViewProps {
  optionClickHandler: (item: IContactSearchItem) => any;
  triggerEventTracking: (eventName: string, contactType: string) => any;
  inputRef: React.RefObject<HTMLInputElement>;
  userInput: string;
  directlyProceedText: string;
  filterCallQueueExtension?: boolean;
  componentType?: 'Autocomplete' | 'DialTextField';
  excludeCompanyExtension?: boolean;
  helperText?: string;
  /**
   * does autoFocus on the input when render
   *
   * @default true
   */
  autoFocusInput?: boolean;
  inputValue?: string;
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

export interface SuggestionListItemData extends BaseSuggestionListItemData {
  profileImageUrl?: string;
  phoneNumber: string;
  name?: string;
  doNotCall?: boolean;
  freeSolo?: boolean;
}

export interface ContactSearchPanelProps extends ContactSearchViewProps {
  currentLocale: string;
  centered?: boolean;
  showOtherContacts?: boolean;
  companyContacts: IContactSearchItem[];
  otherContacts: IContactSearchItem[];
  personalContacts: IContactSearchItem[];
  thirdPartyContacts?: IContactSearchItem[];
  thirdPartySourceName?: string;
  minimumSearchLength?: number;
  isThirdPartySearching: boolean;
  directlyProceedText: string;
  defaultTab?: TabsEnumType;
  searchHandler: (searchString: string) => Promise<any>;
  setFilterString: (filterString: string) => void;
  /**
   * @deprecated
   *
   * use apps/micro-auth/src/app/components/FormattedPhoneNumber.tsx directly
   */
  formatPhone: (phoneNumber: string) => string | null | undefined;
  getCompanyExtraInfoByIds: (ids: string[]) => Promise<any>;
  changeTabTrack: (v: string) => void;
  getPresence: GetPresenceFn;
  ThirdPartyAvatar?: FunctionComponent<{
    type?: string;
  }>;
  checkIsDncNumber?: (phoneNumber: string) => boolean;
}
