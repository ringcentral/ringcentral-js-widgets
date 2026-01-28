import {
  injectable,
  RcModule,
  optional,
} from '@ringcentral-integration/next-core';

import { ContactMatcher } from '../ContactMatcher';
import { ContactSearch } from '../ContactSearch';
import { Contacts } from '../Contacts';

import type { ContactInitiatorOptions } from './ContactInitiator.interface';

@injectable({
  name: 'ContactInitiator',
})
export class ContactInitiator extends RcModule {
  constructor(
    protected _contactSearch: ContactSearch,
    protected _contactMatcher: ContactMatcher,
    protected _contacts: Contacts,
    @optional('ContactInitiatorOptions')
    protected _contactInitiatorOptions?: ContactInitiatorOptions,
  ) {
    super();
    this.initialize();
  }

  protected initialize() {
    this._contactSearch.addSearchSource({
      sourceName: 'contacts',
      searchFn: async ({ searchString }) => {
        const items = await this._contacts.searchForPhoneNumbers(searchString!);
        return items;
      },
      formatFn(entities) {
        return entities;
      },
      readyCheckFn: () => {
        return this._contacts.ready;
      },
    });

    this._contactMatcher.addSearchProvider({
      name: 'contacts',
      // @ts-ignore
      searchFn: async ({ queries }) => {
        const items = await this._contacts.matchContacts({
          phoneNumbers: queries,
        });
        return items;
      },
      readyCheckFn: () => {
        return this._contacts.ready;
      },
    });
  }
}
