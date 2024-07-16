import { computed, RcModuleV2 } from '@ringcentral-integration/core';

import type {
  ContactSource,
  IContact,
  TypedContact,
  TypedPhoneNumber,
} from '../../interfaces/Contact.model';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';

import type { Deps } from './Contacts.interface';

@Module({
  name: 'Contacts',
  deps: [
    'Auth',
    { dep: 'ContactSources', optional: true },
    { dep: 'ContactsOptions', optional: true },
  ],
})
export class Contacts<T extends Deps = Deps> extends RcModuleV2<T> {
  protected _contactSources = new Map<string, ContactSource>();

  protected _sourcesLastStatus = new Map<
    string,
    { ready?: boolean; data?: IContact[] }
  >();

  protected _sourcesUpdatedAt = Date.now();

  constructor(deps: T) {
    super({
      deps,
    });
    for (const source of this._deps.contactSources ?? []) {
      this.addSource(source);
    }
  }

  override _shouldInit() {
    return this._deps.auth.loggedIn && this.sourceModuleReady && this.pending;
  }

  override _shouldReset() {
    return (!this._deps.auth.loggedIn || !this.sourceModuleReady) && this.ready;
  }

  addSource(source: ContactSource) {
    if (!source.sourceName) {
      throw new Error('[Contacts > ContactSource > sourceName] is required');
    }
    if (this._contactSources.has(source.sourceName)) {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > sourceName] already exists`,
      );
    }
    if (source.getPresence && typeof source.getPresence !== 'function') {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > getPresence] must be a function`,
      );
    }
    if (
      source.getProfileImage &&
      typeof source.getProfileImage !== 'function'
    ) {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > getProfileImage] must be a function`,
      );
    }
    if (source.findContact && typeof source.findContact !== 'function') {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > findContact] must be a function`,
      );
    }
    if (source.filterContacts && typeof source.filterContacts !== 'function') {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > filterContacts] must be a function`,
      );
    }
    if (
      source.searchForPhoneNumbers &&
      typeof source.searchForPhoneNumbers !== 'function'
    ) {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > searchForPhoneNumbers] must be a function`,
      );
    }
    if (
      source.matchContactsByPhoneNumber &&
      typeof source.matchContactsByPhoneNumber !== 'function'
    ) {
      throw new Error(
        `[Contacts > ContactSource(${source.sourceName}) > matchContactsByPhoneNumber] must be a function`,
      );
    }
    this._contactSources.set(source.sourceName, source);
    this._sourcesLastStatus.set(source.sourceName, {});
    this._sourcesUpdatedAt = Date.now();
  }

  checkSourceUpdated() {
    let updated = false;
    for (const sourceName of Array.from(this._contactSources.keys())) {
      const source = this._contactSources.get(sourceName);
      const lastStatus = this._sourcesLastStatus.get(sourceName);
      if (
        source &&
        lastStatus &&
        (lastStatus.ready !== source.sourceReady ||
          lastStatus.data !== source.contacts)
      ) {
        updated = true;
        this._sourcesLastStatus.set(sourceName, {
          ready: source.sourceReady,
          data: source.contacts,
        });
      }
    }
    if (updated) {
      this._sourcesUpdatedAt = Date.now();
    }
    return this._sourcesUpdatedAt;
  }

  async findContact({
    sourceName,
    contactId,
  }: {
    sourceName: string;
    contactId: string;
  }) {
    let contact = null;
    const source = this._contactSources.get(sourceName);
    if (source && typeof source.findContact === 'function') {
      try {
        contact = await source.findContact(contactId);
      } catch (error: any /** TODO: confirm with instanceof */) {
        console.error(
          `[Contacts > ContactSource(${source.sourceName}) > findContact] ${error}`,
        );
      }
    }
    return contact;
  }

  async filterContacts(searchFilter: string) {
    const sources = Array.from(this._contactSources.values()).filter(
      (source) => typeof source.filterContacts === 'function',
    );
    let result: IContact[] = [];
    await Promise.all(
      sources.map((source) => {
        const promise = Promise.resolve(source.filterContacts!(searchFilter));
        return promise
          .then((items) => {
            if (items) {
              result = result.concat(items);
            }
          })
          .catch((error) => {
            console.error(
              `[Contacts > ContactSource(${source.sourceName}) > filterContacts] ${error}`,
            );
          });
      }),
    );
    return result;
  }

  async searchForPhoneNumbers(searchString: string) {
    const sources = Array.from(this._contactSources.values()).filter(
      (source) => typeof source.searchForPhoneNumbers === 'function',
    );
    let result: TypedPhoneNumber[] = [];
    await Promise.all(
      sources.map((source) => {
        const promise = Promise.resolve(
          source.searchForPhoneNumbers!(searchString),
        );
        return promise
          .then((items) => {
            if (items) {
              result = result.concat(items);
            }
          })
          .catch((error) => {
            console.error(
              `[Contacts > ContactSource(${source.sourceName}) > searchForPhoneNumbers] ${error}`,
            );
          });
      }),
    );
    return result;
  }

  async matchContactsByPhoneNumber(phoneNumber: string) {
    const sources = Array.from(this._contactSources.values()).filter(
      (source) => typeof source.matchContactsByPhoneNumber === 'function',
    );
    let result: TypedContact[] = [];
    await Promise.all(
      sources.map((source) => {
        const promise = Promise.resolve(
          source.matchContactsByPhoneNumber!(phoneNumber),
        );
        return promise
          .then((items) => {
            if (items) {
              result = result.concat(items);
            }
          })
          .catch((error) => {
            console.error(
              `[Contacts > ContactSource(${source.sourceName}) > matchContactsByPhoneNumber] ${error}`,
            );
          });
      }),
    );
    return result;
  }

  async matchContacts({ phoneNumbers }: { phoneNumbers: string[] }) {
    const result: Record<string, TypedContact[]> = {};
    await Promise.all(
      phoneNumbers.map((phoneNumber) => {
        const promise = this.matchContactsByPhoneNumber(phoneNumber);
        return promise.then((items) => {
          result[phoneNumber] = items;
        });
      }),
    );
    return result;
  }

  @proxify
  async getProfileImage(contact: IContact, useCache = true) {
    const source = this._contactSources.get(contact && contact.type);
    if (source && source.getProfileImage) {
      const result = await source.getProfileImage(contact, useCache);
      return result;
    }
    return null;
  }

  @proxify
  async getPresence(contact: IContact, useCache = true) {
    const source = this._contactSources.get(contact && contact.type);
    if (source && source.sourceReady && source.getPresence) {
      const result = await source.getPresence(contact, useCache);
      return result;
    }
    return null;
  }

  @proxify
  async sync(...args: unknown[]) {
    const syncPromises = [];
    for (const sourceName of Array.from(this._contactSources.keys())) {
      const source = this._contactSources.get(sourceName);
      if (typeof source?.sync === 'function') {
        syncPromises.push(source.sync(...args));
      }
    }
    await Promise.all(syncPromises);
  }

  get sourceModuleReady() {
    let ready = true;
    for (const sourceName of Array.from(this._contactSources.keys())) {
      const source = this._contactSources.get(sourceName);
      if (!source?.ready) {
        ready = false;
        break;
      }
    }
    return ready;
  }

  @computed((that: Contacts) => [
    that._contactSources.size,
    that.checkSourceUpdated(),
  ])
  get sourceNames() {
    const names = [];
    for (const sourceName of Array.from(this._contactSources.keys())) {
      const source = this._contactSources.get(sourceName);
      if (source?.sourceReady) {
        names.push(sourceName);
      }
    }
    return names;
  }

  @computed((that: Contacts) => [that.checkSourceUpdated()])
  get allContacts() {
    let contacts: IContact[] = [];
    for (const sourceName of Array.from(this._contactSources.keys())) {
      const source = this._contactSources.get(sourceName);
      if (source?.sourceReady && source.contacts) {
        contacts = contacts.concat(source.contacts);
      }
    }
    return contacts;
  }

  get contactSources() {
    return this._contactSources;
  }
}
