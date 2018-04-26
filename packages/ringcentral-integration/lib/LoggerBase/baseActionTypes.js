import Enum from '../Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'log',
  'logSuccess',
  'logError',
]);
