import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
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
