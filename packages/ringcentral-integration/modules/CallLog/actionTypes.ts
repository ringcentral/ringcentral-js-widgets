import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'fetch',
    'fetchSuccess',
    'fetchError',
    'fSync',
    'fSyncSuccess',
    'fSyncError',
    'iSync',
    'iSyncSuccess',
    'iSyncError',
    'clearToken',
  ],
  'callLogActionTypes',
);

export default actionTypes;
