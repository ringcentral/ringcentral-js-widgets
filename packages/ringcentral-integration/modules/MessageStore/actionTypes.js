import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'conversationsSync',
  'conversationsFSyncSuccess',
  'conversationsISyncSuccess',
  'conversationsSyncError',
  'conversationSync',
  'conversationSyncError',
  'updateMessages',
  'markMessages',
  'clickToSMS',
  'clickToCall',
  'deleteConversation',
], 'newMessageStore');
