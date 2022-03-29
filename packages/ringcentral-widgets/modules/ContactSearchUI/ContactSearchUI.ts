import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  RcUIModuleV2,
  UIFunctions,
  UIProps,
  computed,
  state,
  action,
  watch,
} from '@ringcentral-integration/core';
import { debounce } from '@ringcentral-integration/commons/lib/debounce-throttle';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';

import {
  Deps,
  ContactSearchPanelProps,
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
    { dep: 'ContactSearch', optional: true },
  ],
})
export class ContactSearchUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  private _companyContactsCache: Record<string, IContactSearchItem[]> = {};
  private _personalContactsCache: Record<string, IContactSearchItem[]> = {};

  constructor(deps: Deps & T) {
    super({
      deps,
    });
  }

  @state
  filterString = '';

  private _debouncedSetFilterString = debounce({
    fn: this._setFilterString,
    threshold: 800,
  });

  @action
  _setFilterString(filterString: string) {
    this.filterString = filterString;
  }

  getFilteredCompanyContacts(searchFilter: string) {
    const lowCaseString = searchFilter.toLowerCase();
    if (this._companyContactsCache[lowCaseString]) {
      return this._companyContactsCache[lowCaseString];
    }
    const startTime = Date.now();
    const filterResult =
      this._deps.accountContacts.filterContacts(lowCaseString);

    const accountFilterEnd = Date.now();
    const maps = filterResult.map(({ id, name, phoneNumbers, type }) => {
      const isNameInclude = name.toLowerCase().includes(lowCaseString);
      const filteredNumbers = isNameInclude
        ? phoneNumbers
        : phoneNumbers.filter(({ phoneNumber }) =>
            phoneNumber.includes(lowCaseString),
          );
      return filteredNumbers.map(({ phoneType, phoneNumber }, index) => ({
        id,
        name,
        type,
        phoneType,
        phoneNumber,
        isPrimary: index === 0,
      }));
    });

    const result = maps.reduce(
      (accumulator, currentValue) => accumulator.concat(currentValue),
      [],
    );
    const formatFilterEnd = Date.now();
    const accountFilterTime = ((accountFilterEnd - startTime) / 1000).toFixed(
      2,
    );
    const formatFilterTime = (
      (formatFilterEnd - accountFilterEnd) /
      1000
    ).toFixed(2);

    console.log(
      `exec time Company: ${accountFilterTime} s, and ui filter: ${formatFilterTime}`,
    );
    this._companyContactsCache[lowCaseString] = result;
    return result;
  }

  getFilteredPersonalContacts(searchFilter: string) {
    const lowCaseString = searchFilter.toLowerCase();
    if (this._personalContactsCache[lowCaseString]) {
      return this._personalContactsCache[lowCaseString];
    }

    const filterResult = this._deps.addressBook.filterContacts(lowCaseString);

    const maps = filterResult.map(({ id, name, phoneNumbers, type }) => {
      // const uniqueTypeNumbers = uniqBy((item) => item.phoneType, phoneNumbers);
      const isNameInclude = name.toLowerCase().includes(lowCaseString);
      const filteredNumbers = isNameInclude
        ? phoneNumbers
        : phoneNumbers.filter(({ phoneNumber }) =>
            phoneNumber.includes(lowCaseString),
          );
      return filteredNumbers.map(({ phoneType, phoneNumber }, index) => ({
        id,
        name,
        type,
        phoneType,
        phoneNumber,
        isPrimary: index === 0,
      }));
    });

    const result = maps.reduce(
      (accumulator, currentValue) => accumulator.concat(currentValue),
      [],
    );
    this._personalContactsCache[lowCaseString] = result;
    return result;
  }

  @computed(({ filterString }) => [filterString])
  get companyContacts() {
    return this.getFilteredCompanyContacts(this.filterString);
  }

  @computed(({ filterString }) => [filterString])
  get personalContacts() {
    return this.getFilteredPersonalContacts(this.filterString);
  }

  onInitOnce() {
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
      },
    );
  }

  getUIProps({
    userInput,
    inputRef,
  }: PageProps): UIProps<ContactSearchPanelProps> {
    return {
      currentLocale: this._deps.locale.currentLocale,
      companyContacts: this.companyContacts,
      personalContacts: this.personalContacts,
      userInput,
      inputRef,
    };
  }

  getUIFunctions({
    optionClickHandler,
  }: PageProps): UIFunctions<ContactSearchPanelProps> {
    return {
      optionClickHandler,
      searchHandler: async (searchString) => {
        await this._deps.contactSearch?.search({ searchString });
        return this._deps.contactSearch?.sortedResult.slice(0, 50);
      },
      setFilterString: (filterString: string) =>
        this._debouncedSetFilterString(filterString),
      formatPhone: this.formatPhone,
    };
  }

  formatPhone = (phoneNumber: string) => {
    return formatNumber({
      phoneNumber,
      areaCode: this._deps.regionSettings.areaCode,
      countryCode: this._deps.regionSettings.countryCode,
    });
  };
}
