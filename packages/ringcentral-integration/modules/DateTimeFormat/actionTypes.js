import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';
import proxyActionTypes from '../../enums/proxyActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  ...Object.keys(proxyActionTypes),
], 'dateTimeFormat');
