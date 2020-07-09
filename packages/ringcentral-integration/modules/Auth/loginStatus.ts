import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
  ['loggingIn', 'loggedIn', 'beforeLogout', 'loggingOut', 'notLoggedIn'],
  'loginStatus',
);
