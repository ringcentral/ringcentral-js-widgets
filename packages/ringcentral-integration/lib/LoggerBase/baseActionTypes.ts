import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const baseActionTypes = ObjectMap.fromKeys([
  ...ObjectMap.keys(moduleActionTypes),
  'log',
  'logSuccess',
  'logError',
]);

export default baseActionTypes;
