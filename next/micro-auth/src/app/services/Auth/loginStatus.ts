import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const loginStatus = ObjectMap.prefixKeys(
  ['loggingIn', 'loggedIn', 'beforeLogout', 'loggingOut', 'notLoggedIn'],
  'loginStatus',
);
