import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const authStatus = ObjectMap.prefixKeys(
  ['LOGIN_SUCCESS', 'LOGOUT_BEFORE', 'LOGOUT_AFTER', 'BEFORE_LOGOUT_COMPLETE'],
  'auth',
);
