import { messageTypes } from '../../../../enums';

// TODO: update wording

export default {
  [messageTypes.NO_SUPPORT_COUNTRY]:
    'Sorry, outbound call to the outside of the U.S. and Canada is not yet supported.',
  [messageTypes.FAILED_TO_CALL]:
    'Sorry, the line is busy or is at pending disposition.',
  [messageTypes.OFFHOOK_INIT_ERROR]: 'Internal error offhook init occurred.',
  [messageTypes.OFFHOOK_TERM_ERROR]: 'Internal error offhook term occurred.',
  [messageTypes.ADD_SESSION_ERROR]: 'Internal error add session occurred.',
  [messageTypes.DROP_SESSION_ERROR]: 'Internal error drop session occurred.',
  [messageTypes.HOLD_ERROR]: 'Internal error hold/unhold call occurred.',
  [messageTypes.LOGOUT_FAIL_WITH_CALL_CONNECTED]:
    'Logout is not working while the call is still connected.',
  [messageTypes.RECORD_PAUSE]: 'Call recording paused.',
  [messageTypes.RECORD_RESUME]: 'Call recording resumed.',
  [messageTypes.INTERCEPT]:
    'The dial result for your manual outbound call was INTERCEPT.',
};
