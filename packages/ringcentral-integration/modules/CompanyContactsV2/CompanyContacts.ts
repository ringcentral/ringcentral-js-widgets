import { ContactResource } from '@rc-ex/core/definitions';
import {
  action,
  computed,
  state,
  storage,
  watch,
} from '@ringcentral-integration/core';
import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { filter, find, forEach, map, reduce, reject } from 'ramda';
import { Unsubscribe } from 'redux';

import { extensionStatusTypes } from '../../enums/extensionStatusTypes';
import { extensionTypes } from '../../enums/extensionTypes';
import { phoneTypes } from '../../enums/phoneTypes';
import { subscriptionFilters } from '../../enums/subscriptionFilters';
import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { Deps } from './CompanyContacts.interface';

/**
 * TODO:
 * 1. Consider moving the filters to some UI module for display contact list
 * 2. Find out whether there are other types should be searchable/matchable, but hidden in contact lists
 * 3. Find out whether isAvailableExtension can be better defined in our business logic layer
 * 4. Standardize and remove the IVR contacts special treatments
 */

const contactsRegExp = /.*\/directory\/contacts$/;

const DEFAULT_TTL = 24 * 60 * 60 * 1000;
const DEFAULT_SHOW_DISABLED = false;
const DEFAULT_SHOW_NOT_ACTIVATED = false;
const DEFAULT_ALLOW_SETTINGS = false;

const DEFAULT_SELECTED_TYPES: ObjectMapValue<typeof extensionTypes>[] = [
  extensionTypes.digitalUser,
  extensionTypes.user,
  extensionTypes.department,
  // extensionTypes.limited,
  // extensionTypes.announcement,
  // extensionTypes.applicationExtension,
  // extensionTypes.bot,
  // extensionTypes.faxUser,
  // extensionTypes.ivrMenu,
  // extensionTypes.pagingOnly,
  // extensionTypes.parkLocation,
  // extensionTypes.sharedLinesGroup,
];

@Module({
  name: 'CompanyContacts',
  deps: [
    'Client',
    'ExtensionFeatures',
    'DataFetcherV2',
    'Subscription',
    'Storage',
    { dep: 'TabManager', optional: true },
    { dep: 'CompanyContactsOptions', optional: true },
  ],
})
export class CompanyContacts extends DataFetcherV2Consumer<
  Deps,
  ContactResource[]
> {
  protected _stopWatching: Unsubscribe = null;

  constructor(deps: Deps) {
    super({
      deps,
    });
    const { ttl = DEFAULT_TTL, polling = true } =
      deps.companyContactsOptions ?? {};
    this._source = new DataSource({
      ...deps.companyContactsOptions,
      key: 'companyContacts',
      polling,
      ttl,
      cleanOnReset: true,
      fetchFunction: async (): Promise<ContactResource[]> =>
        fetchList((params: any) =>
          this._deps.client.account().directory().contacts().list(params),
        ),
      readyCheckFunction: () =>
        this._deps.extensionFeatures.ready && this._deps.subscription.ready,
      permissionCheckFunction: () =>
        this._deps.extensionFeatures.features?.ReadExtensions.available ??
        false,
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  // company directory events is missing in official swagger spec
  protected _handleSubscription(message: any) {
    if (
      this.ready &&
      (this._source.disableCache || (this._deps.tabManager?.active ?? true)) &&
      contactsRegExp.test(message?.event) &&
      message?.body?.contacts
    ) {
      let data = this.data ?? [];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      forEach(({ eventType, oldEtag, newEtag, ...contact }) => {
        if (eventType === 'Create' || eventType === 'Update') {
          data = [...reject((item) => item.id === contact.id, data), contact];
        } else if (eventType === 'Delete') {
          data = [...reject((item) => item.id === contact.id, data)];
        }
      }, message.body.contacts);
      this._deps.dataFetcherV2.updateData(this._source, data, Date.now());
    }
  }

  onInit() {
    this._deps.subscription.subscribe([subscriptionFilters.companyContacts]);
    this._stopWatching = watch(
      this,
      () => this._deps.subscription.message,
      (message) => this._handleSubscription(message),
    );
  }

  onReset() {
    this._stopWatching?.();
    this._stopWatching = null;
  }

  get allowSettings() {
    return (
      this._deps.companyContactsOptions?.allowSettings ?? DEFAULT_ALLOW_SETTINGS
    );
  }

  @storage
  @state
  _showDisabled: boolean = null;

  @storage
  @state
  _showNotActivated: boolean = null;

  get extensionTypes() {
    return extensionTypes;
  }

  @storage
  @state
  _selectedTypes: ObjectMapValue<typeof extensionTypes>[] = null;

  @action
  setShowDisabled(showDisabled: boolean) {
    this._showDisabled = showDisabled;
  }

  @action
  setShowNotActivated(showNotActivated: boolean) {
    this._showNotActivated = showNotActivated;
  }

  get showDisabled() {
    return (
      (this.allowSettings
        ? this._showDisabled ?? this._deps.companyContactsOptions?.showDisabled
        : this._deps.companyContactsOptions?.showDisabled) ??
      DEFAULT_SHOW_DISABLED
    );
  }

  get showNotActivated() {
    return (
      (this.allowSettings
        ? this._showNotActivated ??
          this._deps.companyContactsOptions?.showNotActivated
        : this._deps.companyContactsOptions?.showNotActivated) ??
      DEFAULT_SHOW_NOT_ACTIVATED
    );
  }

  get selectedTypes() {
    return (
      (this.allowSettings
        ? this._selectedTypes ??
          this._deps.companyContactsOptions?.selectedTypes
        : this._deps.companyContactsOptions?.selectedTypes) ??
      DEFAULT_SELECTED_TYPES
    );
  }

  @computed(
    ({ selectedTypes, showDisabled, showNotActivated }: CompanyContacts) => [
      selectedTypes,
      showDisabled,
      showNotActivated,
    ],
  )
  get _extensionFilter() {
    const typeFilter = reduce(
      (acc, type) => {
        acc[type] = true;
        return acc;
      },
      {} as Record<string, boolean>,
      this.selectedTypes,
    );
    return filter<ContactResource>(
      (item) =>
        !(
          (!this.showDisabled &&
            item.status === extensionStatusTypes.disabled) ||
          (!this.showNotActivated &&
            item.status === extensionStatusTypes.notActivated) ||
          !typeFilter[item.type]
        ),
    );
  }

  @computed(({ data, _extensionFilter }: CompanyContacts) => [
    data,
    _extensionFilter,
  ])
  get filteredContacts() {
    return this._extensionFilter(this.data ?? []);
  }

  @computed(({ data }: CompanyContacts) => [data])
  get ivrContacts() {
    const ivrContacts = filter(
      (item) => item.type === extensionTypes.ivrMenu,
      this.data ?? [],
    );
    return map((item) => {
      return {
        ...item,
        phoneNumbers: [
          ...(item.phoneNumbers ?? []),
          {
            phonetype: phoneTypes.extension,
            phoneNumber: item.extensionNumber,
          },
        ],
      };
    }, ivrContacts);
  }

  isAvailableExtension(extensionNumber: string) {
    return !!find(
      (item) => item.extensionNumber === extensionNumber,
      this.filteredContacts.concat(this.ivrContacts),
    );
  }
}
