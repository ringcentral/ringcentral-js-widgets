import { createEnum } from '../../lib/Enum';

export default createEnum(
  ['loggingIn', 'loggedIn', 'beforeLogout', 'loggingOut', 'notLoggedIn'],
  'loginStatus',
);
