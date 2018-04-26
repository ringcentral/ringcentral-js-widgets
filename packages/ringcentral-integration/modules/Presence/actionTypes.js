import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'notification',
  'fetch',
  'fetchSuccess',
  'fetchError',
  'update',
  'updateSuccess',
  'updateError',
], 'presence');
