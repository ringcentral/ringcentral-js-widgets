import { ActionMap } from '../../lib/redux-helper';

export default new ActionMap([
  'register',
  'registerSuccess',
  'registerError',
  'unregister',

  // outbound call
  'call',
  'callConnect',
  // inbound call
  'callAccept',
  'callIncoming',

  'callEnd',
  'callError',
  'callOperation',
  // no active session
  'sessionError',
]);
