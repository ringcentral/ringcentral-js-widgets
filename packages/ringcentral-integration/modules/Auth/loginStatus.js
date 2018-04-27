import Enum from '../../lib/Enum';

export default new Enum([
  'loggingIn',
  'loggedIn',
  'beforeLogout',
  'loggingOut',
  'notLoggedIn',
], 'loginStatus');
