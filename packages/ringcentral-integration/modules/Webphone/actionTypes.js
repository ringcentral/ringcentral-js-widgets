import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'connect',
    'registered',
    'connectError',
    'connectFailed',
    'disconnect',
    'disconnectOnInactive',
    'unregisteredOnInactive',
    'unregistered',
    'reconnect',
    'setRetryCounts',
    'updateSessions',
    'destroySessions',
    'beforeCallStart',
    'callInit',
    'callStart',
    'callResume',
    'callEnd',
    'callRing',
    'callAnswer',
    'toggleMinimized',
    'resetMinimized',
    'videoElementPrepared',
    'getUserMediaSuccess',
    'getUserMediaError',
    'setSessionCaching',
    'clearSessionCaching',
    'onholdCachedSession',
    'setIncomingAudio',
    'resetIncomingAudio',
    'setOutgoingAudio',
    'resetOutgoingAudio',
    'setRingtone',
  ],
  'webphone',
);

export default actionTypes;
