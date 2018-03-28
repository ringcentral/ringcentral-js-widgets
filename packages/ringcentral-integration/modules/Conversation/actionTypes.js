import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'reply',
  'replySuccess',
  'replyError',
  'load',
  'unload',
  'updateRecipients',
  'loadId',
  'updateMessages',
  'removeMessage'
], 'conversation');
