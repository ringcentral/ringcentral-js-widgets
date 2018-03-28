import Enum from '../../lib/Enum';

export default new Enum([
  'emptyPassword',
  'emptyUsername',
  'sessionExpired',
  'beforeLogoutError',
  'loginError',
  'logoutError',
  'accessDenied',
  'internalError',
], 'authMessages');
