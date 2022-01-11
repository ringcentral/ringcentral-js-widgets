import { AddressBookSync } from '@rc-ex/core/definitions';

import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { ExtensionFeatures } from '../ExtensionFeatures';

export interface AddressBookOptions extends DataSourceBaseProps {
  fetchInterval?: number;
  perPage?: number;
}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  extensionFeatures: ExtensionFeatures;
  AddressBookOptions?: AddressBookOptions;
}

export interface SyncParameters {
  perPage: number;
  syncType?: 'ISync' | 'FSync';
  syncToken?: string;
  pageId?: number;
}

export type PersonalContactResource = AddressBookSync['records'][number];
export interface AddressBookData {
  records: PersonalContactResource[];
  syncToken: AddressBookSync['syncInfo']['syncToken'];
}
