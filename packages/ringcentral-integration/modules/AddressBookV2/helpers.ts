import { forEach } from 'ramda';

import { AddressBookSync } from '@rc-ex/core/definitions';

import { syncTypes } from '../../enums/syncTypes';
import { SyncParameters } from './AddressBook.interface';

const REGX_DECODE = /&\w+;/g;
const DECODE: Record<string, string> = {
  '&amp;': '&',
  '&bsol;': '\\',
  '&sol;': '/',
  '&apos;': "'",
};

export function decodeName(str: string) {
  return str.replace(REGX_DECODE, ($0: string) => {
    let handleText = $0;
    if (DECODE[$0]) {
      handleText = DECODE[$0];
    }
    return handleText;
  });
}

export function processAddressBookResponse(data: AddressBookSync) {
  if (Array.isArray(data?.records)) {
    forEach((record) => {
      if (record.firstName) {
        record.firstName = decodeName(record.firstName);
      }
      if (record.lastName) {
        record.lastName = decodeName(record.lastName);
      }
      // remove uri from record to reduce size
      delete record.uri;
    }, data.records);
  }
  return data;
}
export function getSyncParams({
  perPage,
  syncToken,
  pageId,
}: SyncParameters): SyncParameters /* SyncAddressBookParameters */ {
  const params: SyncParameters = {
    perPage,
  };
  if (syncToken) {
    params.syncToken = syncToken;
    params.syncType = syncTypes.iSync;
  } else {
    params.syncType = syncTypes.fSync;
  }
  if (pageId) {
    params.pageId = pageId;
  }
  return params;
}
