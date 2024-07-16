import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type {
  ContactPresence,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import { debounce } from '@ringcentral-integration/commons/lib/debounce-throttle';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import { proxify } from '@ringcentral-integration/commons/lib/proxy/proxify';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import {
  action,
  computed,
  RcUIModuleV2,
  state,
  track,
  watch,
} from '@ringcentral-integration/core';

import { getRcFilteredContacts } from './ContactSearchHelper';
import type {
  ContactSearchPanelProps,
  Deps,
  IContactSearchItem,
  PageProps,
} from './ContactSearchUI.interface';

@Module({
  name: 'ContactSearchUI',
  deps: [
    'Locale',
    'AccountContacts',
    'AddressBook',
    'RegionSettings',
    'AccountInfo',
    'RouterInteraction',
    'Contacts',
    { dep: 'ContactSearch', optional: true },
    { dep: 'ContactSearchUIOptions', optional: true },
  ],
})
export class ContactSearchUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  private _companyContactsCache: Record<string, IContactSearchItem[]> = {};
  private _otherContactsCache: Record<string, IContactSearchItem[]> = {};
  private _personalContactsCache: Record<string, IContactSearchItem[]> = {};
  private _minimumSearchLength?: number;
  private _companyContacts;

  constructor(deps: T) {
    super({
      deps,
    });
    this._minimumSearchLength = this._deps?.contactSearch?.minimalSearchLength;
    this._companyContacts = this._deps.accountContacts.contacts;
  }

  @state
  filterString = '';

  private _debouncedSetFilterString = debounce({
    fn: this._setFilterString,
    threshold: 800,
  });

  private _debouncedGetCompanyExtraInfoByIds = debounce({
    fn: this.getCompanyExtraInfoByIds,
    threshold: 500,
  });

  @action
  _setFilterString(filterString: string) {
    this.filterString = filterString;
  }

  getFilteredCompanyContacts(searchFilter = '') {
    const lowCaseString = searchFilter.toLowerCase();
    const accountContacts = this._deps.accountContacts.contacts;
    if (this._companyContacts !== accountContacts) {
      this._companyContacts = accountContacts;
    } else if (this._companyContactsCache[lowCaseString]) {
      return this._companyContactsCache[lowCaseString];
    }

    const contacts = this._deps.contactSearchUIOptions?.filterCallQueueNumber
      ? accountContacts.filter((contact) => !contact.isCallQueueNumber)
      : accountContacts;
    const result = getRcFilteredContacts({
      lowCaseString,
      contacts,
    });

    this._companyContactsCache[lowCaseString] = result;
    return result;
  }

  getFilteredCallQueueContacts(searchFilter = '') {
    const lowCaseString = searchFilter.toLowerCase();
    if (this._companyContacts !== this._deps.accountContacts.contacts) {
      this._companyContacts = this._deps.accountContacts.contacts;
    } else if (this._otherContactsCache[lowCaseString]) {
      return this._otherContactsCache[lowCaseString];
    }

    const result = getRcFilteredContacts({
      lowCaseString,
      contacts: this._deps.accountContacts.contacts.filter(
        (contact) => contact.isCallQueueNumber,
      ),
    });

    this._otherContactsCache[lowCaseString] = result;
    return result;
  }

  getFilteredPersonalContacts(searchFilter = '') {
    const lowCaseString = searchFilter.toLowerCase();
    if (this._personalContactsCache[lowCaseString]) {
      return this._personalContactsCache[lowCaseString];
    }

    const result = getRcFilteredContacts({
      lowCaseString,
      contacts: this._deps.addressBook.contacts,
    });

    this._personalContactsCache[lowCaseString] = result;
    return result;
  }

  @computed((that: ContactSearchUI) => [
    that.filterString,
    that._deps.accountContacts.contacts,
  ])
  get companyContacts() {
    return this.getFilteredCompanyContacts(this.filterString);
  }

  @computed((that: ContactSearchUI) => [
    that.filterString,
    that._deps.accountContacts.contacts,
  ])
  get otherContacts() {
    if (this._deps.contactSearchUIOptions?.filterCallQueueNumber)
      return this.getFilteredCallQueueContacts(this.filterString);

    return [];
  }

  @computed((that: ContactSearchUI) => [that.otherContacts])
  get filterCallQueueExtContacts() {
    return (
      this.otherContacts
        .filter((contact) => contact.phoneType !== phoneTypes.extension)
        // need to set isPrimary to true to show the phone number in the contact search panel
        .map((contact) => ({
          ...contact,
          isPrimary: true,
        }))
    );
  }

  @computed((that: ContactSearchUI) => [
    that.filterString,
    that._deps.addressBook.contacts,
  ])
  get personalContacts() {
    return this.getFilteredPersonalContacts(this.filterString);
  }

  @computed((that: ContactSearchUI) => [that._deps.contactSearch?.searchResult])
  get searchContactList() {
    return this._deps.contactSearch?.searchResult.slice(0, 500);
  }

  @track((that: ContactSearchUI, tab) => [
    that._deps.routerInteraction.currentPath === '/dialer'
      ? trackEvents.changeDailerDirectoryTab
      : trackEvents.changeSMSDirectoryTab,
    { tab },
  ])
  changeTabTrack(tab: string) {
    //
  }

  override onInitOnce() {
    watch(
      this,
      () => this._deps.addressBook.contacts,
      () => {
        this._personalContactsCache = {};
      },
    );

    watch(
      this,
      () => this._deps.accountContacts.contacts,
      () => {
        this._companyContactsCache = {};
        this._otherContactsCache = {};
      },
    );
  }

  formatPhone = (phoneNumber: string) => {
    return formatNumber({
      phoneNumber,
      areaCode: this._deps.regionSettings.areaCode,
      countryCode: this._deps.regionSettings.countryCode,
      maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
    });
  };

  getCompanyExtraInfoByIds(ids: string[]) {
    for (let i = 0; i < ids.length; i++) {
      const contact = this._deps.accountContacts.rcCompanyMapping[ids[i]];
      if (contact) {
        this._deps.accountContacts.getProfileImage(contact);
      }
    }
  }

  @proxify
  async getPresence(
    contact: IContact,
    useCache = true,
  ): Promise<ContactPresence | null> {
    const presence = await this._deps.contacts.getPresence(contact, useCache);
    return presence;
  }

  getUIProps({
    userInput,
    inputRef,
    directlyProceedText,
    filterCallQueueExtension,
  }: PageProps): UIProps<ContactSearchPanelProps> {
    // @ts-expect-error TS(2741): Property 'thirdPartySourceName' is missing in type... Remove this comment to see the full error message
    return {
      currentLocale: this._deps.locale.currentLocale,
      companyContacts: this.companyContacts,
      otherContacts: filterCallQueueExtension
        ? this.filterCallQueueExtContacts
        : this.otherContacts,
      personalContacts: this.personalContacts,
      userInput,
      inputRef,
      centered: this._deps.contactSearchUIOptions?.centered ?? false,
      showOtherContacts:
        this._deps.contactSearchUIOptions?.filterCallQueueNumber ?? false,
      minimumSearchLength: this._minimumSearchLength,
      thirdPartyContacts: this.searchContactList as IContactSearchItem[],
      isThirdPartySearching: !this._deps.contactSearch?.isIdle,
      directlyProceedText,
    };
  }

  getUIFunctions({
    optionClickHandler,
    triggerEventTracking,
  }: PageProps): UIFunctions<ContactSearchPanelProps> {
    return {
      optionClickHandler,
      triggerEventTracking,
      searchHandler: async (searchString) => {
        await this._deps.contactSearch?.debouncedSearch({ searchString });
      },
      setFilterString: (filterString: string) => {
        this._debouncedSetFilterString(filterString);
        if (
          this._minimumSearchLength !== undefined &&
          filterString.length >= this._minimumSearchLength
        ) {
          this._deps.contactSearch?.setPrepareSearch();
          this._deps.contactSearch?.debouncedSearch({
            searchString: filterString,
          });
        }
      },
      formatPhone: this.formatPhone,
      changeTabTrack: (v) => {
        this.changeTabTrack(v);
      },
      getCompanyExtraInfoByIds: (ids: string[]) =>
        this._debouncedGetCompanyExtraInfoByIds(ids),
      getPresence: (contact, useCache) => {
        return this.getPresence(contact, useCache);
      },
    };
  }
}
