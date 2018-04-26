import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'connect',
  'connectError',
  'registered',
  'registrationFailed',
  'disconnect',
  'unregistered',
  'reconnect',
  'resetRetryCounts',
  'updateSessions',
  'destroySessions',
  'callStart',
  'callEnd',
  'callRing',
  'callAnswer',
  'toggleMinimized',
  'resetMinimized',
  'videoElementPrepared',
  'getUserMediaSuccess',
  'getUserMediaError',
], 'webphone');
