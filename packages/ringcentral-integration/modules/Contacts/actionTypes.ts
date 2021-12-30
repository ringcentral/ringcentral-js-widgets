import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'fetchImageSuccess',
    'fetchPresenceSuccess',
    'updateFilter',
  ],
  'contacts',
);

export default actionTypes;
