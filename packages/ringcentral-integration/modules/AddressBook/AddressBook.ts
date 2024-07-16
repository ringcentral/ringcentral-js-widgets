import {
  action,
  computed,
  state,
  storage,
} from '@ringcentral-integration/core';
import { sleep } from '@ringcentral-integration/utils';
import type { ApiError } from '@ringcentral/sdk';
import { forEach, map } from 'ramda';

import { availabilityTypes } from '../../enums/availabilityTypes';
import { phoneSources } from '../../enums/phoneSources';
import type {
  ContactModel,
  ContactSource,
} from '../../interfaces/Contact.model';
import {
  addPhoneToContact,
  getFilterContacts,
  getMatchContactsByPhoneNumber,
  getSearchForPhoneNumbers,
} from '../../lib/contactHelper';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';

import type {
  AddressBookData,
  Deps,
  PersonalContactResource,
} from './AddressBook.interface';
import { getSyncParams, processAddressBookResponse } from './helpers';

export const DEFAULT_FETCH_INTERVAL = 1000;
export const DEFAULT_CONTACTS_PER_PAGE = 250;

// reference: https://developers.ringcentral.com/api-reference/External-Contacts/syncAddressBook
const INVALID_TOKEN_ERROR_CODES = [
  // 400 CMN-101 Parameter [${parameterName}] value is invalid.
  'CMN-101',
];

@Module({
  name: 'AddressBook',
  deps: [
    'Client',
    'ExtensionFeatures',
    'DataFetcherV2',
    'Storage',
    { dep: 'AddressBookOptions', optional: true },
  ],
})
export class AddressBook
  extends DataFetcherV2Consumer<Deps, Partial<AddressBookData>>
  implements ContactSource
{
  constructor(deps: Deps) {
    super({
      deps,
      enableCache: !(deps.addressBookOptions?.disableCache ?? false),
      storageKey: 'AddressBook',
    });
    const { polling = true } = this._deps.addressBookOptions ?? {};
    this._source = new DataSource({
      ...this._deps.addressBookOptions,
      key: 'addressBook',
      polling,
      cleanOnReset: true,
      permissionCheckFunction: () =>
        this._deps.extensionFeatures.features?.ReadPersonalContacts
          ?.available ?? false,
      readyCheckFunction: () => this._deps.extensionFeatures.ready,
      fetchFunction: async () => {
        const data = await this._sync();
        this.setAddressBookData(data);
        return {};
      },
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  @storage
  @state
  addressBookData: Partial<AddressBookData> = {};

  @action
  setAddressBookData(data: Partial<AddressBookData>) {
    this.addressBookData = data;
  }

  override onInit() {
    // for compatibility with old version cache
    const data = this._deps.dataFetcherV2.getData(this._source);
    if (data?.syncToken) {
      this._deps.dataFetcherV2.updateData(this._source, {}, Date.now());
      this.setAddressBookData(data);
    }
  }

  // just a workaround for the update performance issue
  // TODO: refactor with type
  override get data() {
    return this.addressBookData;
  }

  protected get _fetchInterval() {
    return (
      this._deps.addressBookOptions?.fetchInterval ?? DEFAULT_FETCH_INTERVAL
    );
  }

  protected get _perPage() {
    return this._deps.addressBookOptions?.perPage ?? DEFAULT_CONTACTS_PER_PAGE;
  }

  get syncToken() {
    return this.data?.syncToken;
  }

  protected async _fetch(perPage: number, syncToken?: string, pageId?: number) {
    const params = getSyncParams({
      perPage,
      syncToken,
      pageId,
    });
    return processAddressBookResponse(
      await this._deps.client
        .account()
        .extension()
        .addressBookSync()
        .list(params),
    );
  }

  protected _processISyncData(records: PersonalContactResource[]) {
    if (records?.length > 0) {
      const updatedRecords: PersonalContactResource[] = [];
      // @ts-expect-error TS(2344): Type 'number | undefined' does not satisfy the con... Remove this comment to see the full error message
      const processedIDMap: Record<PersonalContactResource['id'], true> = {};
      forEach((record) => {
        if (record.availability === availabilityTypes.alive) {
          // Only keep entries that is 'alive', omit 'purged' and 'deleted'
          updatedRecords.push(record);
        }
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        processedIDMap[record.id] = true;
      }, records);
      forEach((record) => {
        // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
        if (!processedIDMap[record.id]) {
          // record has no updates
          updatedRecords.push(record);
        }
      }, this.data?.records ?? []);
      return updatedRecords;
    }
    return this.data.records;
  }

  protected async _fetchAll(syncToken?: string) {
    const perPage = this._perPage;
    let records: PersonalContactResource[] = [];
    let response = await this._fetch(perPage, syncToken);
    records = records.concat(response.records ?? []);
    while (response.nextPageId) {
      await sleep(this._fetchInterval);
      response = await this._fetch(perPage, syncToken, response.nextPageId);
      records = records.concat(response.records ?? []);
    }
    if (response.syncInfo!.syncType === 'ISync') {
      // @ts-expect-error TS(2322): Type 'PersonalContactResource[] | undefined' is no... Remove this comment to see the full error message
      records = this._processISyncData(records);
    }
    return {
      syncToken: response.syncInfo!.syncToken,
      records,
    };
  }

  protected async _sync(): Promise<AddressBookData> {
    try {
      const data = await this._fetchAll(this.syncToken);
      return data;
    } catch (e: unknown) {
      const error = e as ApiError;

      // 403 Forbidden
      if (error.response?.status === 403) {
        return {} as AddressBookData;
      }

      // try Full Sync
      const responseResult = await error.response?.clone().json();
      if (
        responseResult?.errors?.some(({ errorCode = '' } = {}) =>
          INVALID_TOKEN_ERROR_CODES.includes(errorCode),
        )
      ) {
        const data = await this._fetchAll();
        return data;
      }

      // exception
      console.error('[AddressBook] > _sync', error.response?.status, error);
      throw error;
    }
  }

  // interface of ContactSource
  @proxify
  async sync() {
    await this._deps.dataFetcherV2.fetchData(this._source);
  }

  // interface of ContactSource
  findContact(contactId: string) {
    return this.contacts.find((x) => x.id === contactId);
  }

  // interface of ContactSource
  filterContacts(searchFilter: string) {
    return getFilterContacts(this.contacts, searchFilter);
  }

  // interface of ContactSource
  searchForPhoneNumbers(searchString: string) {
    return getSearchForPhoneNumbers({
      contacts: this.contacts,
      searchString,
      entityType: phoneSources.contact,
    });
  }

  // interface of ContactSource
  matchContactsByPhoneNumber(phoneNumber: string) {
    return getMatchContactsByPhoneNumber({
      contacts: this.contacts,
      phoneNumber,
      entityType: phoneSources.rcContact,
    });
  }

  // interface of ContactSource
  get sourceName() {
    return 'personal';
  }

  // interface of ContactSource
  @computed(({ data }: AddressBook) => [data])
  get contacts() {
    return map((rawContact) => {
      const contact: ContactModel = {
        ...rawContact,
        type: this.sourceName,
        phoneNumbers: [],
        emails: [],
        id: `${rawContact.id}`,
        name: `${rawContact.firstName ?? ''} ${rawContact.lastName ?? ''}`,
      };
      if (rawContact.email) {
        contact.emails.push(rawContact.email);
      }
      if (rawContact.email2) {
        contact.emails.push(rawContact.email2);
      }
      if (rawContact.email3) {
        contact.emails.push(rawContact.email3);
      }
      forEach((key) => {
        if (/Phone|Fax/.test(key) && typeof contact[key] === 'string') {
          addPhoneToContact(contact, contact[key] as string, key);
        }
      }, Object.keys(contact) as (keyof typeof contact)[]);
      return contact;
    }, this.data?.records ?? []);
  }

  // interface of ContactSource
  @computed(({ data }: AddressBook) => [data])
  get rawContacts() {
    return this.data?.records ?? [];
  }

  @computed((that: AddressBook) => [that.contacts])
  get rcPersonalMapping() {
    const rcPersonalMapping: any = {};
    this.contacts.forEach((item: any) => {
      rcPersonalMapping[item.id] = item;
    });
    return rcPersonalMapping;
  }

  // interface of ContactSource
  get sourceReady() {
    return this.ready;
  }
}
