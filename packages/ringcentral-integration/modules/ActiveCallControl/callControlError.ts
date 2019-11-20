import { createEnum } from '../../lib/Enum';

export default createEnum(
  [
    'holdConflictError',
    'unHoldConflictError',
    'muteConflictError',
    'unMuteConflictError',
    'generalError',
  ],
  'callControl',
);
