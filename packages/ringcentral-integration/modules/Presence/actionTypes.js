import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'fetch',
    'fetchSuccess',
    'fetchError',
    'update',
    'updateSuccess',
    'updateError',
    'notification',
  ],
  'presence',
);

export default actionTypes;
