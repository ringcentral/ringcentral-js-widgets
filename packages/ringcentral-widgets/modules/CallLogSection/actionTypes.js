import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from '@ringcentral-integration/commons/enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'update',
    'saving',
    'saveSuccess',
    'saveError',
    'cleanUp',
    'syncing',
    'showLogSection',
    'closeLogSection',
    'showLogNotification',
    'closeLogNotification',
    'expandNotification',
    'shrinkNotification',
  ],
  'callLogSection',
);

export default actionTypes;
