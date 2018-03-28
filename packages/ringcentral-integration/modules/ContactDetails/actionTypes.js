import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'updateCondition',
  'resetCondition',
  'clickToSMS',
  'clickToCall'
], 'contactDetails');
