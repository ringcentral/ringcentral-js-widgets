import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type {
  ContactPresence,
  IContact,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import { debounce } from '@ringcentral-integration/commons/lib/debounce-throttle';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  AccountInfo,
  RegionSettings,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { Locale } from '@ringcentral-integration/micro-core/src/app/services';
import { IntegrationConfig } from '@ringcentral-integration/micro-setting/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  action,
  computed,
  injectable,
  optional,
  delegate,
  RcViewModule,
  RouterPlugin,
  state,
  useConnector,
  watch,
} from '@ringcentral-integration/next-core';
import { ContactSearchPanel } from '@ringcentral-integration/widgets/components/ContactSearchPanel';
import React, { useRef } from 'react';

import {
  AccountContacts,
  AddressBook,
  Contacts,
  ContactSearch,
} from '../../services';

import type {
  ContactSearchPanelProps,
  ContactSearchViewOptions,
  ContactSearchViewProps,
  IContactSearchItem,
} from './ContactSearch.view.interface';
import {
  excludePhoneTypesFromContacts,
  getRcFilteredContacts,
} from './ContactSearchHelper';
import {
  ContactSearchPanel as SpringContactSearchPanel,
  DialerContactSearchPanel as SpringDialerContactSearchPanel,
} from './ContactSearchPanel';

const EMPTY_ARRAY: IContactSearchItem[] = [];

@injectable({
  name: 'ContactSearchView',
})
export class ContactSearchView extends RcViewModule {
  private _companyContactsCache: Record<string, IContactSearchItem[]> = {};
  private _otherContactsCache: Record<string, IContactSearchItem[]> = {};
  private _personalContactsCache: Record<string, IContactSearchItem[]> = {};

  private get _minimumSearchLength() {
    return this._contactSearch?.minimalSearchLength;
  }

  constructor(
    protected _locale: Locale,
    protected _accountContacts: AccountContacts,
    protected _addressBook: AddressBook,
    protected _regionSettings: RegionSettings,
    protected _accountInfo: AccountInfo,
    protected _router: RouterPlugin,
    protected _contacts: Contacts,
    protected _integrationConfig: IntegrationConfig,
    @optional() protected _contactSearch?: ContactSearch,
    @optional('ContactSearchViewOptions')
    protected _contactSearchViewOptions?: ContactSearchViewOptions,
  ) {
    super();

    // when contacts change（for example: relogin）, clear the filtered cache to refresh cache
    watch(
      this,
      () => this._addressBook.contacts,
      () => {
        this._personalContactsCache = {};
      },
    );

    watch(
      this,
      () => this._accountContacts.contacts,
      () => {
        this._companyContactsCache = {};
        this._otherContactsCache = {};
      },
    );
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
    const accountContacts = this._accountContacts.contacts;
    if (this._companyContactsCache[lowCaseString]) {
      return this._companyContactsCache[lowCaseString];
    }

    let filterCallQueueNumber =
      this._contactSearchViewOptions?.filterCallQueueNumber;
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      filterCallQueueNumber = true;
    }

    const contacts = filterCallQueueNumber
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
    const accountContacts = this._accountContacts.contacts;
    if (this._otherContactsCache[lowCaseString]) {
      return this._otherContactsCache[lowCaseString];
    }

    const result = getRcFilteredContacts({
      lowCaseString,
      contacts: accountContacts.filter((contact) => contact.isCallQueueNumber),
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
      contacts: this._addressBook.contacts,
    });

    this._personalContactsCache[lowCaseString] = result;
    return result;
  }

  @computed
  get companyContacts() {
    return this.getFilteredCompanyContacts(this.filterString);
  }

  @computed
  get excludeExtCompanyContacts() {
    return excludePhoneTypesFromContacts(this.companyContacts, [
      phoneTypes.extension,
    ]);
  }

  /**
   * other contacts include call queue numbers
   */
  @computed
  get otherContacts() {
    return this.getFilteredCallQueueContacts(this.filterString);
  }

  @computed((that: ContactSearchView) => [that.otherContacts])
  get filterCallQueueExtContacts() {
    return excludePhoneTypesFromContacts(this.otherContacts, [
      phoneTypes.extension,
    ]);
  }

  @computed((that: ContactSearchView) => [
    that.filterString,
    that._addressBook.contacts,
  ])
  get personalContacts() {
    return this.getFilteredPersonalContacts(this.filterString);
  }

  getThirdPartyContacts(inputValue: string | undefined): IContactSearchItem[] {
    const searching = !this._contactSearch?.isIdle;
    const thirdPartySearchSourceKey = this._integrationConfig.key;

    if (!thirdPartySearchSourceKey || !inputValue || searching)
      return EMPTY_ARRAY;

    const thirdPartySearchIdentifier = `${thirdPartySearchSourceKey}-${inputValue}`;

    return (
      (this._contactSearch?.contactSearch[thirdPartySearchIdentifier]
        ?.entities as IContactSearchItem[]) || EMPTY_ARRAY
    );
  }

  /**
   * non spring-ui old project usage, will be removed in the future
   *
   * @deprecated
   */
  @computed
  get searchContactList() {
    return this._contactSearch?.searchResult.slice(0, 500);
  }
  /**
   * non spring-ui old project usage, will be removed in the future
   *
   * @deprecated
   */
  @computed
  get sortedSearchContactList() {
    return this._contactSearch?.sortedResult.slice(0, 500);
  }

  @track((that: ContactSearchView, tab: string) => [
    that._router.currentPath === '/dialer'
      ? trackEvents.changeDailerDirectoryTab
      : trackEvents.changeSMSDirectoryTab,
    { tab },
  ])
  changeTabTrack(_tab: string) {
    //
  }

  formatPhone = (phoneNumber: string) => {
    return formatNumber({
      phoneNumber,
      areaCode: this._regionSettings.areaCode,
      countryCode: this._regionSettings.countryCode,
      maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
    });
  };

  getCompanyExtraInfoByIds(ids: string[]) {
    for (let i = 0; i < ids.length; i++) {
      const contact = this._accountContacts.rcCompanyMapping[ids[i]];
      if (contact) {
        this._contacts.getProfileImage(contact);
      }
    }
  }

  @delegate('server')
  async getPresence(
    contact: IContact,
    useCache = true,
  ): Promise<ContactPresence | null> {
    const presence = await this._contacts.getPresence(contact, useCache);
    return presence;
  }

  @delegate('server')
  async setFilterString(filterString: string) {
    this._debouncedSetFilterString(filterString);

    // spring-ui version already clear the search related logic, check inside the contact search service, not need to do anything here
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      await this._contactSearch?.debouncedSearch({
        searchString: filterString,
      });
      return;
    }

    if (
      this._minimumSearchLength !== undefined &&
      filterString.length >= this._minimumSearchLength
    ) {
      await this._contactSearch?.triggerPrepareSearch();
      await this._contactSearch?.debouncedSearch({
        searchString: filterString,
      });
    }
  }

  getUIProps({
    userInput,
    inputRef,
    directlyProceedText,
    filterCallQueueExtension,
    excludeCompanyExtension,
    inputValue,
    helperText,
  }: ContactSearchViewProps): UIProps<ContactSearchPanelProps> {
    const isThirdPartySearching = !this._contactSearch?.isIdle;

    // TODO: remove after all project migrate to spring-ui version app
    const deprecatedThirdPartyContacts = isThirdPartySearching
      ? EMPTY_ARRAY
      : ((this._contactSearchViewOptions?.useSortedResult
          ? this.sortedSearchContactList
          : this.searchContactList) as IContactSearchItem[]);
    return {
      currentLocale: this._locale.currentLocale,
      companyContacts: excludeCompanyExtension
        ? this.excludeExtCompanyContacts
        : this.companyContacts,
      personalContacts: this.personalContacts,
      otherContacts: filterCallQueueExtension
        ? this.filterCallQueueExtContacts
        : this.otherContacts,
      userInput,
      inputRef,
      showOtherContacts:
        this._contactSearchViewOptions?.filterCallQueueNumber ??
        // default on for spring-ui
        process.env.THEME_SYSTEM === 'spring-ui',
      centered: this._contactSearchViewOptions?.centered ?? false,
      minimumSearchLength: this._minimumSearchLength,
      thirdPartyContacts:
        process.env.THEME_SYSTEM === 'spring-ui'
          ? this.getThirdPartyContacts(inputValue)
          : deprecatedThirdPartyContacts,
      isThirdPartySearching,
      directlyProceedText,
      thirdPartySourceName: this._integrationConfig.name ?? '',
      helperText: helperText ?? this._contactSearchViewOptions?.helperText,
    };
  }

  getUIFunctions({
    optionClickHandler,
    triggerEventTracking,
  }: ContactSearchViewProps): UIFunctions<ContactSearchPanelProps> {
    return {
      optionClickHandler,
      triggerEventTracking,
      searchHandler: async (searchString) => {
        await this._contactSearch?.debouncedSearch({ searchString });
      },
      setFilterString: async (filterString: string) => {
        await this.setFilterString(filterString);
      },
      formatPhone: this.formatPhone,
      changeTabTrack: (v) => {
        this.changeTabTrack(v);
      },
      getCompanyExtraInfoByIds: async (ids: string[]) =>
        // TODO: spring-ui, after all projects are migrated to spring-ui, remove this
        this._debouncedGetCompanyExtraInfoByIds(ids),
      getPresence: (contact, useCache) => {
        return this.getPresence(contact, useCache);
      },
      ThirdPartyAvatar: this._contactSearchViewOptions?.ThirdPartyAvatar,
    };
  }

  component(props: ContactSearchViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      const Component =
        this._contactSearchViewOptions?.component ||
        props.componentType === 'DialTextField'
          ? SpringDialerContactSearchPanel
          : SpringContactSearchPanel;
      // @ts-ignore
      return <Component {..._props} {...uiFunctions} />;
    }

    const Component =
      this._contactSearchViewOptions?.component || ContactSearchPanel;
    // @ts-ignore
    return <Component {..._props} {...uiFunctions} />;
  }
}
