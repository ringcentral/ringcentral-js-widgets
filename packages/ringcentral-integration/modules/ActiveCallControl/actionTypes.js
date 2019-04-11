import Enum from '../../lib/Enum';
import { moduleActionTypes } from '../../enums/moduleActionTypes';

function getActionSet(action) {
  return [
    action,
    `${action}Success`,
    `${action}Error`,
  ];
}

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'updateActiveSessions',
  'updateActiveSessionStatus',
  'removeActiveSession',
  'updateSessions',
  'resetSuccess',
  'setActiveSessionId',
  'startRecord',
  'stopRecord',
  'recordFail',
  ...getActionSet('mute'),
  ...getActionSet('unmute'),
  ...getActionSet('hold'),
  ...getActionSet('unhold'),
  ...getActionSet('transfer'),
  ...getActionSet('reject'),
  ...getActionSet('hangUp'),
  ...getActionSet('flip'),
], 'activeCallControlStore');
