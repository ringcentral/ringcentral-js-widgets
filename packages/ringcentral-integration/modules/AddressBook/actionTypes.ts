import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'sync',
    'syncError',
    'syncSuccess',
    'cleanUp',
  ],
  'address-book',
);

export default actionTypes;
