import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'fetchImageSuccess',
  'batchFetchPresenceSuccess',
], 'accountContacts');
