import Enum from '../../lib/Enum';

export default new Enum([
  'holdError',
  'unHoldError',
  'holdConflictError',
  'unHoldConflictError',
  'muteError',
  'unMuteError',
  'muteConflictError',
  'unMuteConflictError',
  'hangUpError',
  'rejectError',
  'transferError'
], 'callControl');
