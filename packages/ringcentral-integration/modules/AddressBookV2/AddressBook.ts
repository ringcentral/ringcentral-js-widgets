import { AddressBookSync } from '@rc-ex/core/definitions';
import { computed } from '@ringcentral-integration/core';
import { forEach, map } from 'ramda';

import { phoneSources } from '../../enums/phoneSources';
import { ContactModel } from '../../interfaces/Contact.model';
import {
  getSearchContacts,
  getMatchContacts,
  addPhoneToContact,
} from '../../lib/contactHelper';
import { Module } from '../../lib/di';
import sleep from '../../lib/sleep';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';
import { Deps } from './AddressBook.interface';
import { decodeAddressBookResponse, getSyncParams } from './helpers';

export const DEFAULT_FETCH_INTERVAL = 1000;
export const DEFAULT_CONTACTS_PER_PAGE = 250;

@Module({
  name: 'AddressBook',
  deps: [
    'Client',
    'RolesAndPermissions',
    'DataFetcherV2',
    { dep: 'AddressBookOptions', optional: true },
  ],
})
export class AddressBook extends DataFetcherV2Consumer<
  Deps,
  Pick<AddressBookSync, 'syncInfo' | 'records'>
> {
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
        !!this._deps.rolesAndPermissions.permissions.ReadPersonalContacts,
      readyCheckFunction: () => this._deps.rolesAndPermissions.ready,
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
    return this.data?.syncInfo?.syncToken;
  }

  protected async _fetch(perPage: number, syncToken: string, pageId?: number) {
    const params = getSyncParams({
      perPage,
      syncToken,
      pageId,
    });
    return decodeAddressBookResponse(
      await this._deps.client
        .account()
        .extension()
        .addressBookSync()
        .list(params),
    );
  }

  protected async _sync() {
    try {
      const syncToken = this.syncToken;
      const perPage = this._perPage;
      let records: AddressBookSync['records'] = [];
      let response = await this._fetch(perPage, syncToken);
      records = records.concat(response.records ?? []);
      while (response.nextPageId) {
        await sleep(this._fetchInterval);
        response = await this._fetch(perPage, syncToken, response.nextPageId);
        records = records.concat(response.records ?? []);
      }
      return {
        syncInfo: response.syncInfo,
        records,
      };
    } catch (error) {
      if (error?.response?.status === 403) {
        return null;
      }
      throw error;
    }
  }

  // interface of ContactSource
  searchContacts(searchString: string) {
    return getSearchContacts({
      contacts: this.contacts,
      searchString,
      entityType: phoneSources.contact,
      options: null,
    });
  }

  // interface of ContactSource
  matchPhoneNumber(phoneNumber: string) {
    return getMatchContacts({
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
  @computed<AddressBook>(({ data }) => [data])
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
        addPhoneToContact(contact, contact[key], key);
      }, Object.keys(contact) as (keyof typeof contact)[]);
      return contact;
    }, this.data?.records ?? []);
  }

  // interface of ContactSource
  get sourceReady() {
    return this.ready;
  }
}
