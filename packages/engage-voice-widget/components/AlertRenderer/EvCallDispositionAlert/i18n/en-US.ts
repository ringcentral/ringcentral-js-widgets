import { logTypes } from '../../../../enums/logTypes';

export default {
  [logTypes.CALL_DISPOSITION_SUCCESS]: 'Log is saved successfully.',
  [logTypes.CALL_DISPOSITION_FAILURE]: 'Failed to log, try again later.',
};
