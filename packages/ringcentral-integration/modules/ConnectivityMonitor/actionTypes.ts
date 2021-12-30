import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'connectSuccess',
    'connectFail',
    'networkLoss',
  ],
  'connectivityMonitor',
);

export default actionTypes;
