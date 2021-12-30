import { moduleActionTypes } from '@ringcentral-integration/commons/enums/moduleActionTypes';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

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
