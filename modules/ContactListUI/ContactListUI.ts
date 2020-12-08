import { RcModuleV2 } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';
import { Deps } from './ContactListUI.interface';

@Module({
  name: 'ContactListUI',
  deps: [
    'Locale',
    'ExtensionInfo',
    'ContactList',
    { dep: 'ContactDetailsUI', optional: true },
  ],
})
export class ContactListUI extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({ deps });
  }

  getUIProps({ bottomNotice, bottomNoticeHeight }) {
    return {
      currentLocale: this._deps.locale.currentLocale,
      contactSourceNames: this._deps.contactList.sourceNames || [],
      contactGroups: this._deps.contactList.contactGroups || [],
      searchSource: this._deps.contactList.sourceFilter,
      searchString: this._deps.contactList.searchFilter,
      isSearching: this._deps.contactList.isFiltering,
      showSpinner: !(this._deps.locale.ready && this._deps.contactList.ready),
      currentSiteCode: this._deps.extensionInfo?.site?.code ?? '',
      isMultipleSiteEnabled:
        this._deps.extensionInfo?.isMultipleSiteEnabled ?? false,
      bottomNotice,
      bottomNoticeHeight,
    };
  }

  getUIFunctions({ onItemSelect, onVisitPage, onRefresh }) {
    return {
      getAvatarUrl(): string {
        return null;
      },
      getPresence: (contact: any) => {
        return this._deps.contactList.getPresence(contact);
      },
      onItemSelect:
        onItemSelect ||
        (async ({ type, id }: { type: string; id: string }) => {
          if (this._deps.contactDetailsUI) {
            this._deps.contactDetailsUI.showContactDetails({ type, id });
          }
        }),
      onSearchContact: ({
        searchSource,
        searchString,
      }: {
        searchSource: string;
        searchString: string;
      }) => {
        this._deps.contactList.applyFilters({
          sourceFilter: searchSource,
          searchFilter: searchString,
        });
      },
      onVisitPage: () => {
        if (typeof onVisitPage === 'function') {
          onVisitPage();
        }
        // fire filtering contacts if not yet
        if (!this._deps.contactList.filterStamp) {
          this._deps.contactList.applyFilters();
        }
      },
      onRefresh,
    };
  }
}
