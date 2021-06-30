import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from '@ringcentral-integration/commons/enums/moduleActionTypes';

export const baseActionTypes = ObjectMap.fromKeys([
  ...ObjectMap.keys(moduleActionTypes),
  'setupOAuth',
  'destroyOAuth',
]);

export default baseActionTypes;
