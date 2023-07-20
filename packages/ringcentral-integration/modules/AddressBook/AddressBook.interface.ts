import type AddressBookSync from '@rc-ex/core/lib/definitions/AddressBookSync';

import type {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import type { ExtensionFeatures } from '../ExtensionFeatures';

export interface AddressBookOptions extends DataSourceBaseProps {
  fetchInterval?: number;
  perPage?: number;
}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  extensionFeatures: ExtensionFeatures;
  addressBookOptions?: AddressBookOptions;
}

export interface SyncParameters {
  perPage: number;
  syncType?: 'ISync' | 'FSync';
  syncToken?: string;
  pageId?: number;
}

export type PersonalContactResource = NonNullable<
  AddressBookSync['records']
>[number];
export interface AddressBookData {
  records: PersonalContactResource[];
  syncToken: NonNullable<AddressBookSync['syncInfo']>['syncToken'];
}
