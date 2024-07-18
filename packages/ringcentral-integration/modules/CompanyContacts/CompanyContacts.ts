import type ContactResource from '@rc-ex/core/lib/definitions/ContactResource';
import {
  action,
  computed,
  state,
  storage,
  watch,
} from '@ringcentral-integration/core';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { filter, find, forEach, map, reduce, reject } from 'ramda';
import type { Unsubscribe } from 'redux';

import { extensionStatusTypes } from '../../enums/extensionStatusTypes';
import { extensionTypes } from '../../enums/extensionTypes';
import { phoneTypes } from '../../enums/phoneTypes';
import { subscriptionFilters } from '../../enums/subscriptionFilters';
import { Module } from '../../lib/di';
import fetchList from '../../lib/fetchList';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';

import type { Deps } from './CompanyContacts.interface';

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
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
  protected _stopWatching: Unsubscribe = null;

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: !(deps.companyContactsOptions?.disableCache ?? false),
      storageKey: 'CompanyContacts',
    });
    const { ttl = DEFAULT_TTL, polling = true } =
      deps.companyContactsOptions ?? {};
    this._source = new DataSource({
      ...deps.companyContactsOptions,
      key: 'companyContacts',
      polling,
      ttl,
      cleanOnReset: true,
      fetchFunction: async () => {
        await this.fetchDataCore();
        return [];
      },
      readyCheckFunction: () => this._deps.extensionFeatures.ready,
      permissionCheckFunction: () =>
        this._deps.extensionFeatures.features?.ReadExtensions?.available ??
        false,
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  protected async fetchContacts(params: any) {
    if (this.enableCompanyPublicApi) {
      const response = await this._deps.client.service
        .platform()
        .get('/restapi/v1.0/account/~/directory/entries', params);

      return response.json();
    }
    const item = this._deps.client
      .account()
      .directory()
      .contacts()
      .list(params);
    return item;
  }

  protected async fetchDataCore() {
    const data = await fetchList((params) => this.fetchContacts(params));
    // @ts-expect-error TS(2345): Argument of type 'unknown[]' is not assignable to ... Remove this comment to see the full error message
    this.setCompanyContactsData(data);
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

  override onInit() {
    // for compatibility with old version cache
    const data = this._deps.dataFetcherV2.getData(this._source);
    if (data?.length > 0) {
      this._deps.dataFetcherV2.updateData(this._source, [], Date.now());
      this.setCompanyContactsData(data);
    }
    this._deps.subscription.subscribe([subscriptionFilters.companyContacts]);
    this._stopWatching = watch(
      this,
      () => this._deps.subscription.message,
      (message) => this._handleSubscription(message),
    );
  }

  override onReset() {
    this._stopWatching?.();
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
    this._stopWatching = null;
  }

  get allowSettings() {
    return (
      this._deps.companyContactsOptions?.allowSettings ?? DEFAULT_ALLOW_SETTINGS
    );
  }

  get enableCompanyPublicApi() {
    return !!this._deps.companyContactsOptions?.enableCompanyPublicApi;
  }

  @storage
  @state
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'boolean'.
  _showDisabled: boolean = null;

  @storage
  @state
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'boolean'.
  _showNotActivated: boolean = null;

  @storage
  @state
  companyContactsData: ContactResource[] = [];

  @action
  setCompanyContactsData(data: ContactResource[]) {
    this.companyContactsData = data;
  }

  // just a workaround for the update performance issue
  // TODO: refactor with type
  override get data() {
    return this.companyContactsData;
  }

  get extensionTypes() {
    return extensionTypes;
  }

  @storage
  @state
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type '("Announcem... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
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
