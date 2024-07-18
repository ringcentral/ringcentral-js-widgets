import {
  ObjectMap,
  type ObjectMapValue,
} from '@ringcentral-integration/core/lib/ObjectMap';

export const authMessages = ObjectMap.prefixKeys(
  [
    'emptyPassword',
    'emptyUsername',
    'sessionExpired',
    'beforeLogoutError',
    'logoutError',
    'accessDenied',
    'internalError',
    'siteAccessForbidden',
  ],
  'authMessages',
);

export type AuthMessage = ObjectMapValue<typeof authMessages>;
