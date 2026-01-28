import type ContactResource from '@rc-ex/core/lib/definitions/ContactResource';
import { extensionStatusTypes } from '@ringcentral-integration/commons/enums/extensionStatusTypes';
import { extensionTypes } from '@ringcentral-integration/commons/enums/extensionTypes';
import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import fetchList from '@ringcentral-integration/commons/lib/fetchList';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import {
  ExtensionFeatures,
  Client,
  DataFetcher,
  DataFetcherConsumer,
  DataSource,
} from '@ringcentral-integration/micro-auth/src/app/services';
import type { WebSocketSubscription as Subscription } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  computed,
  injectable,
  optional,
  delegate,
  state,
  storage,
  StoragePlugin,
  watch,
} from '@ringcentral-integration/next-core';
import { filter, find, forEach, map, reduce, reject } from 'ramda';
import type { Unsubscribe } from 'redux';

import type { CompanyContactsOptions } from './CompanyContacts.interface';

/**
 * TODO:
 * 1. Consider moving the filters to some UI module for display contact list
 * 2. Find out whether there are other types should be searchable/matchable, but hidden in contact lists
 * 3. Find out whether isAvailableExtension can be better defined in our business logic layer
 * 4. Standardize and remove the IVR contacts special treatments
 */

const contactsRegExp = /.*\/directory\/contacts$/;

const DEFAULT_TTL = 24 * 60 * 60 * 1000;

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

@injectable({
  name: 'CompanyContacts',
})
export class CompanyContacts extends DataFetcherConsumer<
  ContactResource[] | void
> {
  protected _stopWatching: Unsubscribe | null = null;

  constructor(
    protected _client: Client,
    protected _extensionFeatures: ExtensionFeatures,
    protected override _dataFetcher: DataFetcher,
    protected _storage: StoragePlugin,
    @optional('Subscription') protected _subscription?: Subscription,
    @optional('TabManager') protected _tabManager?: any,
    @optional('CompanyContactsOptions')
    protected _companyContactsOptions?: CompanyContactsOptions,
  ) {
    super(_dataFetcher);
    const disableCache = this._companyContactsOptions?.disableCache ?? false;
    if (!disableCache) {
      this._storage.enable(this);
    }

    const { ttl = DEFAULT_TTL, polling = true } =
      this._companyContactsOptions ?? {};

    this._source = new DataSource({
      ...this._companyContactsOptions,
      key: 'companyContacts',
      polling,
      ttl,
      cleanOnReset: true,
      fetchFunction: () => this._fetchData(),
      readyCheckFunction: () => this.isFetchingReady,
      permissionCheckFunction: () =>
        this._extensionFeatures.features?.ReadExtensions?.available ?? false,
    });
    this._dataFetcher.register(this._source);

    this._subscription?.register(this, {
      filters: [subscriptionFilters.companyContacts],
    });
  }

  protected get isFetchingReady() {
    return this._extensionFeatures.ready;
  }

  protected async fetchContacts(params: any) {
    if (this.enableCompanyPublicApi) {
      const response = await this._client.service
        .platform()
        .get('/restapi/v1.0/account/~/directory/entries', params);

      return response.json();
    }
    const item = this._client.account().directory().contacts().list(params);
    return item;
  }

  protected async _fetchData(): Promise<ContactResource[] | void> {
    return fetchList((params) => this.fetchContacts(params));
  }

  // To update the consistency for the data
  // When in coworker mode, the server process will send this WSG subscription message to coworker to update the status of CompanyContacts data
  // And then sync back to the CompanyContacts module state in the server process.
  @delegate('server')
  protected async _handleSubscription(message?: any) {
    if (
      this.ready &&
      (this._source.disableCache || (this._tabManager?.active ?? true)) &&
      message?.event &&
      contactsRegExp.test(message.event) &&
      message.body?.contacts
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
      this._dataFetcher.updateData(this._source, data, Date.now());
    }
  }

  override onInit() {
    if (this._subscription) {
      this._stopWatching = watch(
        this,
        () => this._subscription!.message,
        (message) => this._handleSubscription(message),
      );
    }
  }

  override onReset() {
    this._stopWatching?.();
    this._stopWatching = null;
  }

  get enableCompanyPublicApi() {
    return !!this._companyContactsOptions?.enableCompanyPublicApi;
  }

  @storage
  @state
  private _showDisabled: boolean | null = null;

  @storage
  @state
  private _showNotActivated: boolean | null = null;

  get extensionTypes() {
    return extensionTypes;
  }

  @storage
  @state
  private _selectedTypes: ObjectMapValue<typeof extensionTypes>[] | null = null;

  @action
  setShowDisabled(showDisabled: boolean) {
    this._showDisabled = showDisabled;
  }

  @action
  setShowNotActivated(showNotActivated: boolean) {
    this._showNotActivated = showNotActivated;
  }

  get showDisabled() {
    // TODO: check the default value in spring-ui of showDisabled
    return false;
  }

  get showNotActivated() {
    // TODO: check the default value in spring-ui of showDisabled
    return process.env.THEME_SYSTEM === 'spring-ui';
  }

  get selectedTypes() {
    return DEFAULT_SELECTED_TYPES;
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
          !typeFilter[item.type!]
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

  @computed
  get allContacts() {
    return this.filteredContacts.concat(this.ivrContacts);
  }

  // TODO: should from source be the map data will be better, because we already have loop data at data process.
  @computed
  get allContactsMap() {
    return this.allContacts.reduce((acc, contact) => {
      acc[contact.id!] = contact;
      return acc;
    }, {} as Record<string, ContactResource>);
  }

  isAvailableExtension(extensionNumber: string) {
    return !!find(
      (item) => item.extensionNumber === extensionNumber,
      this.allContacts,
    );
  }
}
