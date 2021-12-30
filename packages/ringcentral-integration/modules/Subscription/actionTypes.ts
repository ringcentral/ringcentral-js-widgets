import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'addFilters',
    'notification',
    'remove',
    'removeError',
    'removeFilters',
    'removeSuccess',
    'renewError',
    'renewSuccess',
    'setFilters',
    'subscribe',
    'subscribeError',
    'subscribeSuccess',
  ],
  'subscription',
);

export default actionTypes;
