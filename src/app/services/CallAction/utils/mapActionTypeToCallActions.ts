import type { CallActions } from '@ringcentral-integration/micro-auth/src/app/services/TrackPropsService/TrackPropsService.interface';

import type { CallActionType } from '../../../hooks';

const actionTypeMap = new Map<CallActionType, CallActions>([
  ['answer', 'Answer'],
  ['holdAndAnswer', 'Answer and hold'],
  ['endAndAnswer', 'Answer and end'],
  ['voicemail', 'Reject to voicemail'],
  ['startForward', 'Forward'],
  ['startReply', 'Reply with message'],
  ['ignore', 'Ignore'],
  ['ignoreQueue', 'Ignore'],
  ['mute', 'Mute'],
  ['unmute', 'Unmute'],
  ['hold', 'Hold'],
  ['unHold', 'Unhold'],
  ['startAdd', 'Added new calls'],
  ['startMerge', 'Merged'],
  ['record', 'Recorded'],
  ['stopRecord', 'Stop Record'],
  ['flip', 'Flipped'],
  ['startWarmTransfer', 'Warm transferred'],
  ['startTransfer', 'Cold transferred'],
  ['startTransferToVoicemail', 'Transfer to voicemail'],
  ['hangUp', 'End call'],
  ['sendDTMF', 'Keypad input'],
  ['park', 'Park'],
  ['switch', 'Switch to current device'],
  ['aiNotes', 'Start ai notes'],
  ['audio', 'Select audio device'],
]);

export const mapActionTypeToCallActions = (
  actionType: CallActionType,
): CallActions | null => {
  return actionTypeMap.get(actionType) ?? null;
};
