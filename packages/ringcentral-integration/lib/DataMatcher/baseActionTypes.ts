import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const baseActionTypes = ObjectMap.fromKeys([
  ...ObjectMap.keys(moduleActionTypes),
  'match',
  'matchSuccess',
  'matchError',
  'cleanUp',
  'insertMatchEntries',
]);

export default baseActionTypes;
