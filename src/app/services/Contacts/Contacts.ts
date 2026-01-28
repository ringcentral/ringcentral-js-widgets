import type {
  ContactAvatarSize,
  ContactSource,
  IContact,
  TypedContact,
  TypedPhoneNumber,
} from '@ringcentral-integration/commons/interfaces/Contact.model';
import { mapToSpringUIPresence } from '@ringcentral-integration/micro-auth/src/app/services';
import { Auth } from '@ringcentral-integration/micro-auth/src/app/services/Auth';
import {
  computed,
  delegate,
  injectable,
  optional,
  RcModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import { useEffect } from 'react';

import type { ContactsOptions } from './Contacts.interface';

@injectable({
  name: 'Contacts',
})
export class Contacts extends RcModule {
  protected _contactSources = new Map<string, ContactSource>();
  protected _sourcesLastStatus = new Map<
    string,
    { ready?: boolean; data?: IContact[] }
  >();

  protected _sourcesUpdatedAt = Date.now();

  @computed((that: Contacts) => [that.allContacts])
  get allContactsMap() {
    return new Map(this.allContacts.map((contact) => [contact.id, contact]));
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
      if (source && source.sourceReady && source.contacts) {
        contacts = contacts.concat(source.contacts);
      }
    }
    return contacts;
  }

  get contactSources() {
    return this._contactSources;
  }

  constructor(
    protected _auth: Auth,
    @optional('ContactSources') protected _sources?: ContactSource[],
    @optional('ContactsOptions') protected _contactsOptions?: ContactsOptions,
  ) {
    super();

    for (const source of this._sources ?? []) {
      this.addSource(source);
    }
  }

  override _shouldInit() {
    return this._auth.loggedIn && this.sourceModuleReady && this.pending;
  }

  override _shouldReset() {
    return (!this._auth.loggedIn || !this.sourceModuleReady) && this.ready;
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
      } catch (error) {
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

  getProfileImageSync(contact: IContact, size?: ContactAvatarSize) {
    const source = this._contactSources.get(contact && contact.type);
    return source?.getProfileImageSync?.(contact, size);
  }

  /**
   * @deprecated should use sync way instead, always get url in sync way to avoid the blank image a moment
   *
   * TODO: spring-ui will be removed after all projects switch to spring-ui
   */
  @delegate('server')
  async getProfileImage(contact: IContact, useCache = true) {
    // TODO: spring-ui use getProfileImageSync instead
    if (process.env.THEME_SYSTEM === 'spring-ui') return undefined;

    const source = this._contactSources.get(contact && contact.type);

    return source?.getProfileImage?.(contact, useCache);
  }

  getPresenceSync(contact: IContact, useCache = true) {
    const source = this._contactSources.get(contact && contact.type);
    if (source && source.getPresenceSync) {
      const result = source.getPresenceSync(contact, useCache);
      return result;
    }
    return null;
  }

  unlinkPresence(contact: IContact) {
    const source = this._contactSources.get(contact && contact.type);
    source?.unlinkPresence?.(contact);
  }

  /**
   * @deprecated should use sync way instead, not need so much event send to server
   *
   * TODO: spring-ui will be removed after all projects switch to spring-ui
   */
  @delegate('server')
  async getPresence(contact: IContact, useCache = true) {
    const source = this._contactSources.get(contact && contact.type);
    if (source && source.getPresence) {
      const result = await source.getPresence(contact, useCache);
      return result;
    }
    return null;
  }

  @delegate('server')
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

  /**
   * get current contact data,
   *
   * ### make sure hook that always use inside component render
   */
  useContact(contactId?: string) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useConnector(() => {
      if (!contactId) return null;

      return this.allContactsMap.get(contactId);
    });
  }

  private _getPresence(contact?: IContact | null) {
    if (contact?.type !== 'company') return;

    const presence = this.getPresenceSync(contact);

    if (presence) return mapToSpringUIPresence(presence);
  }

  /**
   * get current contact presence status,
   *
   * ### make sure hook that always use inside component render
   */
  usePresence(contact?: IContact | null) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const state = useConnector(() => this._getPresence(contact));

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      return () => {
        // when unmount, clear link presence listener
        contact && this.unlinkPresence(contact);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return state;
  }
}
