import { createEnum } from '../../lib/Enum';

export default createEnum(
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
