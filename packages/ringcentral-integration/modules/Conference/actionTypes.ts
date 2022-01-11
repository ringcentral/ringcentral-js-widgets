import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { baseActionTypes } from '../../lib/DataFetcher/baseActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(baseActionTypes),
    'updateDialInNumber',
    'updateAdditionalNumbers',
    'updateSaveCurrentSettings',
    'inviteWithText',
    'joinAsHost',
  ],
  'conference',
);

export default actionTypes;
