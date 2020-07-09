import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from '../../enums/moduleActionTypes';

export default ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'login',
    'loginSuccess',
    'loginError',
    'logout',
    'logoutSuccess',
    'logoutError',
    'refresh',
    'refreshSuccess',
    'refreshError',
    'beforeLogout',
    'cancelLogout',
    'tabSync',
  ],
  'authActionTypes',
);
