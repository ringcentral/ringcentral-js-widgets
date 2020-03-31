import { moduleActionTypes } from '../../enums/moduleActionTypes';
import { createEnum } from '../../lib/Enum';

export default createEnum(
  [
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
  moduleActionTypes,
);
