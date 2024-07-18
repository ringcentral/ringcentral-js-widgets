import { logTypes } from '../../../../enums/logTypes';

export default {
  [logTypes.CALL_DISPOSITION_SUCCESS]: 'Log is saved successfully.',
  [logTypes.CALL_DISPOSITION_FAILURE]: 'Failed to log, try again later.',
  [logTypes.CALL_LOG_CREATE_SUCCESS]: 'Call log created.',
  [logTypes.CALL_LOG_CREATE_FAILURE]: 'Failed to create log. Try again later.',
  [logTypes.CALL_LOG_UPDATE_SUCCESS]: 'Call log updated.',
  [logTypes.CALL_LOG_UPDATE_FAILURE]: 'Failed to update log. Try again later.',
} as const;
