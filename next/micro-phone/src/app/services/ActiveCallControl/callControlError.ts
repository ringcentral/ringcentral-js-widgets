import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const callControlError = ObjectMap.prefixKeys(
  [
    'holdConflictError',
    'unHoldConflictError',
    'muteConflictError',
    'unMuteConflictError',
    'generalError',
    'forwardSuccess',
    'transferCompleted',
    'replyCompleted',
  ],
  'callControl',
);
