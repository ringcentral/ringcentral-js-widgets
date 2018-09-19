import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'updateActiveSessions',
  'updateActiveSessionStatus',
  'removeActiveSession',
  'updateSessions',
  'resetSuccess',
  'setActiveSessionId',
  'hangUpSuccess',
  'holdSuccess',
  'unHoldSuccess',
  'startRecord',
  'stopRecord',
  'recordFail',
  'mute',
  'unmute',
  'hold',
  'unhold',
  'proceeding',
], 'activeCallControlStore');
