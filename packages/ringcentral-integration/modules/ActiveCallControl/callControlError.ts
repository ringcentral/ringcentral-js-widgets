import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
  [
    'holdConflictError',
    'unHoldConflictError',
    'muteConflictError',
    'unMuteConflictError',
    'generalError',
    'forwardSuccess',
  ],
  'callControl',
);
