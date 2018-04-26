import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'fetch',
  'fetchSuccess',
  'fetchError',
  'notification',
  'update',
  'updateSuccess',
  'updateError',
], 'detailedPresence');
