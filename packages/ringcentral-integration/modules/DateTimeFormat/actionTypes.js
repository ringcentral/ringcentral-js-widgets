import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from '../../enums/moduleActionTypes';
import { proxyActionTypes } from '../../enums/proxyActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [...ObjectMap.keys(moduleActionTypes), ...ObjectMap.keys(proxyActionTypes)],
  'dateTimeFormat',
);

export default actionTypes;
