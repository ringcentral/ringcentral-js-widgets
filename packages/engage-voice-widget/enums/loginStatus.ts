import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const loginStatus = ObjectMap.prefixKeys(
  [
    'AUTH_SUCCESS',
    'LOGIN_SUCCESS',
    'LOGOUT_BEFORE',
    'LOGOUT_AFTER',
    'LOGGING_OUT',
    'NOT_AUTH',
    'BEFORE_LOGOUT_COMPLETE',
  ],
  'auth',
);
