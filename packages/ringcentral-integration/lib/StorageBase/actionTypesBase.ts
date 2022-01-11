import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const actionTypesBase = ObjectMap.fromKeys([
  'init',
  'initSuccess',
  'reset',
  'resetSuccess',
  'sync',
]);

export default actionTypesBase;
