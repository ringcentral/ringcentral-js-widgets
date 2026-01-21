import type AddressBookSync from '@rc-ex/core/lib/definitions/AddressBookSync';
import type { DataSourceBaseProps } from '@ringcentral-integration/micro-auth/src/app/services';

export interface AddressBookOptions extends DataSourceBaseProps {
  fetchInterval?: number;
  perPage?: number;
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
