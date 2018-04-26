import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
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
], 'authActionTypes');
