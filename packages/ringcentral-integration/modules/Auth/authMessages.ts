import { createEnum } from '../../lib/Enum';

export default createEnum(
  [
    'emptyPassword',
    'emptyUsername',
    'sessionExpired',
    'beforeLogoutError',
    'loginError',
    'logoutError',
    'accessDenied',
    'internalError',
  ],
  'authMessages',
);
