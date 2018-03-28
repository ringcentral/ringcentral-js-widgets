import Enum from '../Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'match',
  'matchSuccess',
  'matchError',
  'cleanUp',
]);
