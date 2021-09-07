import { Auth } from '@ringcentral-integration/commons/modules/AuthV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { ExtensionInfo } from '@ringcentral-integration/commons/modules/ExtensionInfoV2';
import {
  IContact,
  ContactSource,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import { RouteParams, ContactDetailsUI } from '../ContactDetailsUI';

export interface Deps {
  auth: Auth;
  locale: Locale;
  extensionInfo: ExtensionInfo;
  contactSources: ContactSource[];
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
