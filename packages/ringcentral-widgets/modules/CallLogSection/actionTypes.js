import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from 'ringcentral-integration/enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'update',
    'saving',
    'saveSuccess',
    'saveError',
    'cleanUp',
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
