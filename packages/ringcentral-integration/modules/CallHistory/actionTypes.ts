import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'addEndedCalls',
    'removeEndedCalls',
    'clickToSMS',
    'updateSearchInput',
    'filterSuccess',
    'clickToCall',
  ],
  'callHistoryActionTypes',
);

export default actionTypes;
