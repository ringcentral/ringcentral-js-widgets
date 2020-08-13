import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const authMessages = ObjectMap.prefixKeys(
  [
    'emptyPassword',
    'emptyUsername',
    'sessionExpired',
    'beforeLogoutError',
    'logoutError',
    'accessDenied',
    'internalError',
  ],
  'authMessages',
);
