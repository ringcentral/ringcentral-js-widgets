import { forEach, map } from 'ramda';

import { computed } from '@ringcentral-integration/core';

import { availabilityTypes } from '../../enums/availabilityTypes';
import { phoneSources } from '../../enums/phoneSources';
import { ContactModel, ContactSource } from '../../interfaces/Contact.model';
import {
  addPhoneToContact,
  getFilterContacts,
  getMatchContactsByPhoneNumber,
  getSearchForPhoneNumbers,
} from '../../lib/contactHelper';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import sleep from '../../lib/sleep';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import {
  AddressBookData,
  Deps,
  PersonalContactResource,
} from './AddressBook.interface';
import { getSyncParams, processAddressBookResponse } from './helpers';

export const DEFAULT_FETCH_INTERVAL = 1000;
export const DEFAULT_CONTACTS_PER_PAGE = 250;

@Module({
  name: 'AddressBook',
  deps: [
    'Client',
    'ExtensionFeatures',
    'DataFetcherV2',
    { dep: 'AddressBookOptions', optional: true },
  ],
})
export class AddressBook
  extends DataFetcherV2Consumer<Deps, AddressBookData>
  implements ContactSource
{
  constructor(deps: Deps) {
    super({
      deps,
    });
    const { polling = true } = this._deps.AddressBookOptions ?? {};
    this._source = new DataSource({
      ...this._deps.AddressBookOptions,
      key: 'addressBook',
      polling,
      cleanOnReset: true,
      permissionCheckFunction: () =>
        this._deps.extensionFeatures.features?.ReadPersonalContacts
          ?.available ?? false,
      readyCheckFunction: () => this._deps.extensionFeatures.ready,
      fetchFunction: async () => this._sync(),
    });
    this._deps.dataFetcherV2.register(this._source);
  }

  protected get _fetchInterval() {
    return (
      this._deps.AddressBookOptions?.fetchInterval ?? DEFAULT_FETCH_INTERVAL
    );
  }

  protected get _perPage() {
    return this._deps.AddressBookOptions?.perPage ?? DEFAULT_CONTACTS_PER_PAGE;
  }

  get syncToken() {
    return this.data?.syncToken;
  }

  protected async _fetch(perPage: number, syncToken: string, pageId?: number) {
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
      const processedIDMap: Record<PersonalContactResource['id'], true> = {};
      forEach((record) => {
        if (record.availability === availabilityTypes.alive) {
          // Only keep entries that is 'alive', omit 'purged' and 'deleted'
          updatedRecords.push(record);
        }
        processedIDMap[record.id] = true;
      }, records);
      forEach((record) => {
        if (!processedIDMap[record.id]) {
          // record has no updates
          updatedRecords.push(record);
        }
      }, this.data.records);
      return updatedRecords;
    }
    return this.data.records;
  }

  protected async _sync(): Promise<AddressBookData> {
    try {
      const syncToken = this.syncToken;
      const perPage = this._perPage;
      let records: PersonalContactResource[] = [];
      let response = await this._fetch(perPage, syncToken);
      records = records.concat(response.records ?? []);
      while (response.nextPageId) {
        await sleep(this._fetchInterval);
        response = await this._fetch(perPage, syncToken, response.nextPageId);
        records = records.concat(response.records ?? []);
      }
      if (response.syncInfo.syncType === 'ISync') {
        records = this._processISyncData(records);
      }
      return {
        syncToken: response.syncInfo.syncToken,
        records,
      };
    } catch (error) {
      if (error?.response?.status === 403) {
        return {} as AddressBookData;
      }
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
      options: null,
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
      forEach((key: keyof typeof contact) => {
        if (
          key.toLocaleLowerCase().indexOf('phone') === -1 ||
          typeof contact[key] !== 'string'
        ) {
          return;
        }
        addPhoneToContact(contact, contact[key] as string, key);
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
