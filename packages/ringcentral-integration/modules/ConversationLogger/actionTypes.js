import Enum from '../../lib/Enum';
import baseActionTypes from '../../lib/LoggerBase/baseActionTypes';

export default new Enum([
  ...Object.keys(baseActionTypes),
  'setAutoLog',
], 'conversationLogger');
