import { ActionMap } from '../../lib/redux-helper';

export default new ActionMap([
  // operational error
  'error',
  // unregister, clear operational state
  'clear',
  // operation
  'flip',
  'record',
  'stopRecord',
  'hold',
  'unhold',
  'mute',
  'unmute',
  'park',
  'transfer',
  'forward',
  'dtmf',
]);
