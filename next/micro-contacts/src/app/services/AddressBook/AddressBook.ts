import type AddressBookSync from '@rc-ex/core/lib/definitions/AddressBookSync';
import { availabilityTypes } from '@ringcentral-integration/commons/enums/availabilityTypes';
import { phoneSources } from '@ringcentral-integration/commons/enums/phoneSources';
import type {
  ContactModel,
  ContactSource,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import {
  addPhoneToContact,
  getFilterContacts,
  getMatchContactsByPhoneNumber,
  getSearchForPhoneNumbers,
} from '@ringcentral-integration/commons/lib/contactHelper';
import {
  Client,
  ExtensionFeatures,
  DataFetcher,
  DataFetcherConsumer,
  DataSource,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  computed,
  injectable,
  optional,
  delegate,
} from '@ringcentral-integration/next-core';
import { sleep } from '@ringcentral-integration/utils';
import type { ApiError } from '@ringcentral/sdk';
import { forEach, map } from 'ramda';
import type { ListQuery } from 'ringcentral-client/build/paths/MessageSync';

import type {
  AddressBookData,
  AddressBookOptions,
  PersonalContactResource,
} from './AddressBook.interface';
import { getSyncParams, processAddressBookResponse } from './helpers';

export const DEFAULT_FETCH_INTERVAL = 1000;
export const DEFAULT_CONTACTS_PER_PAGE = 250;
export const AddressBookSourceName = 'personal';
@injectable({
  name: 'AddressBook',
})
export class AddressBook
  extends DataFetcherConsumer<Partial<AddressBookData>>
  implements ContactSource
{
  constructor(
    protected _client: Client,
    protected _extensionFeatures: ExtensionFeatures,
    protected override _dataFetcher: DataFetcher,
    @optional('AddressBookOptions')
    protected _addressBookOptions?: AddressBookOptions,
  ) {
    super(_dataFetcher);

    const { polling = true } = this._addressBookOptions ?? {};
    this._source = new DataSource({
      ...this._addressBookOptions,
      key: 'addressBook',
      polling,
      cleanOnReset: true,
      permissionCheckFunction: () =>
        this._extensionFeatures.features?.ReadPersonalContacts?.available ??
        false,
      readyCheckFunction: () => this._extensionFeatures.ready,
      fetchFunction: () => this._sync(),
    });
    this._dataFetcher.register(this._source);
  }

  protected get _fetchInterval() {
    return this._addressBookOptions?.fetchInterval ?? DEFAULT_FETCH_INTERVAL;
  }

  protected get _perPage() {
    return this._addressBookOptions?.perPage ?? DEFAULT_CONTACTS_PER_PAGE;
  }

  get syncToken() {
    return this.data?.syncToken;
  }

  protected async _fetch(perPage: number, syncToken: string, pageId?: number) {
    const params = getSyncParams({
      perPage,
      syncToken,
      pageId,
    }) as ListQuery;
    return processAddressBookResponse(
      (await this._client
        .account()
        .extension()
        .addressBookSync()
        .list(params)) as AddressBookSync,
    );
  }

  protected _processISyncData(records: PersonalContactResource[]) {
    if (records?.length > 0) {
      const updatedRecords: PersonalContactResource[] = [];
      const processedIDMap: Record<number, true> = {};
      forEach((record) => {
        if (record.availability === availabilityTypes.alive) {
          // Only keep entries that is 'alive', omit 'purged' and 'deleted'
          updatedRecords.push(record);
        }
        processedIDMap[record.id!] = true;
      }, records);
      forEach((record) => {
        if (!processedIDMap[record.id!]) {
          // record has no updates
          updatedRecords.push(record);
        }
      }, this.data?.records ?? []);
      return updatedRecords;
    }
    return this.data?.records ?? [];
  }

  protected async _sync(): Promise<AddressBookData> {
    try {
      const syncToken = this.syncToken;
      const perPage = this._perPage;
      let records: PersonalContactResource[] = [];
      let response = await this._fetch(perPage, syncToken!);
      records = records.concat(response.records ?? []);
      while (response.nextPageId) {
        await sleep(this._fetchInterval);
        response = await this._fetch(perPage, syncToken!, response.nextPageId);
        records = records.concat(response.records ?? []);
      }
      if (response.syncInfo!.syncType === 'ISync') {
        records = this._processISyncData(records);
      }
      return {
        syncToken: response.syncInfo!.syncToken,
        records,
      };
    } catch (error) {
      if ((error as ApiError)?.response?.status === 403) {
        return {} as AddressBookData;
      }
      console.error('[AddressBook] > _sync', error);
      throw error;
    }
  }

  // interface of ContactSource
  @delegate('server')
  async sync() {
    await this._dataFetcher.fetchData(this._source);
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
    return AddressBookSourceName;
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
