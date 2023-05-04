import { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import { Auth } from '@ringcentral-integration/commons/modules/Auth';
import { Contacts } from '@ringcentral-integration/commons/modules/Contacts';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';

import { ContactDetailsUI, RouteParams } from '../ContactDetailsUI';

export interface Deps {
  auth: Auth;
  locale: Locale;
  extensionInfo: ExtensionInfo;
  contacts: Contacts;
  contactDetailsUI?: ContactDetailsUI;
}

export interface FilterCriteria {
  sourceFilter?: string;
  searchFilter?: string;
}

export interface StampedFilterCriteria extends FilterCriteria {
  filterStamp?: number;
}

export interface ContactSourceLastStatus {
  sourceReady: boolean;
  contacts: IContact[];
  rawContacts: unknown[];
}

export interface GetUIProps {
  bottomNotice?: any;
  bottomNoticeHeight?: number;
}

export interface GetUIFunctions {
  onVisitPage?: () => any;
  onRefresh?: () => any;
  onItemSelect?: (args: RouteParams) => any;
}
