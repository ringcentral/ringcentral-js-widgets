import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'updateActiveSessions',
    'updateActiveSessionStatus',
    'removeActiveSession',
    'updateSessions',
    'resetSuccess',
    'setActiveSessionId',
    'startRecord',
    'stopRecord',
    'recordFail',
    'mute',
    'muteSuccess',
    'muteError',
    'unmute',
    'unmuteSuccess',
    'unmuteError',
    'hold',
    'holdSuccess',
    'holdError',
    'unhold',
    'unholdSuccess',
    'unholdError',
    'transfer',
    'transferSuccess',
    'transferError',
    'reject',
    'rejectSuccess',
    'rejectError',
    'hangUp',
    'hangUpSuccess',
    'hangUpError',
    'flip',
    'flipSuccess',
    'flipError',
  ],
  'activeCallControlStore',
);

export default actionTypes;
