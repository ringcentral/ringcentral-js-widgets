import { moduleActionTypes } from '@ringcentral-integration/commons/enums/moduleActionTypes';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const baseActionTypes = ObjectMap.fromKeys([
  ...ObjectMap.keys(moduleActionTypes),
  'setupOAuth',
  'destroyOAuth',
]);

export default baseActionTypes;
