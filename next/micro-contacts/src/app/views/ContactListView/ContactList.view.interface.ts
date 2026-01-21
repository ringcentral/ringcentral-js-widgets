import type {
  ContactGroup,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import type ContactsView from '@ringcentral-integration/widgets/components/ContactsView';
import type { ComponentType } from 'react';

import type { RouteParams } from '../ContactDetailsView';

export interface ContactListViewOptions {
  component?: typeof ContactsView;
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

interface IContactsView {
  currentLocale: string;
  contactGroups: {
    id: string;
    caption: string;
    contacts: {
      id?: string;
      type?: string;
      name?: string;
      extensionNumber?: string;
      email?: string;
      profileImageUrl?: string;
      presence?: object;
      contactStatus?: string;
    }[];
  }[];
  contactSourceNames: string[];
  getAvatarUrl: () => void;
  getPresence: () => void;
  showSpinner: boolean;
  currentSiteCode?: string;
  isMultipleSiteEnabled?: boolean;
  searchSource?: string;
  searchString?: string;
  isSearching?: boolean;
  onItemSelect?: () => void;
  onSearchContact?: () => void;
  contactSourceFilterRenderer?: ComponentType<any>;
  sourceNodeRenderer?: () => void;
  onVisitPage?: () => void;
  onRefresh?: () => void;
  bottomNotice?: () => void;
  bottomNoticeHeight?: number;
  children?: React.ReactNode;
}

export type ContactListViewProps = Partial<
  ContactListContainerProps & IContactsView
>;

export type ContactListPanelProps = {
  getAvatarUrl(): string | null;
  getPresence: (contact: IContact) => Promise<any>;
  onItemSelect: (args: RouteParams) => any;
  onSearchContact: ({
    searchSource,
    searchString,
  }: {
    searchSource: string;
    searchString: string;
  }) => void;
  onVisitPage: () => void;
  onRefresh?: () => any;
  currentLocale: string;
  contactSourceNames: string[];
  contactGroups: ContactGroup[];
  searchSource: string;
  searchString: string;
  isSearching: boolean;
  showSpinner: boolean;
  currentSiteCode: string;
  isMultipleSiteEnabled: boolean;
  bottomNotice?: ComponentType<any>;
  bottomNoticeHeight?: number;
};

export interface ContactListContainerProps {
  bottomNotice?: ComponentType<any>;
  bottomNoticeHeight?: number;
  onVisitPage?: () => any;
  onRefresh?: () => any;
  onItemSelect?: (args: RouteParams) => any;
}
