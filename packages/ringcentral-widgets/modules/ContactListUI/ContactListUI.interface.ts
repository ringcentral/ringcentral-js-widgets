import { Auth } from 'ringcentral-integration/modules/AuthV2';
import { Locale } from 'ringcentral-integration/modules/LocaleV2';
import { ExtensionInfo } from 'ringcentral-integration/modules/ExtensionInfoV2';
import {
  IContact,
  ContactSource,
} from 'ringcentral-integration/interfaces/Contact.model';
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
