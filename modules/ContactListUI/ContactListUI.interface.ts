import type { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import type { Auth } from '@ringcentral-integration/commons/modules/Auth';
import type { Contacts } from '@ringcentral-integration/commons/modules/Contacts';
import type { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfo';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';

import type { ContactDetailsUI, RouteParams } from '../ContactDetailsUI';

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
