import { messageTypes } from '../../../../enums';

export default {
  [messageTypes.OVER_BREAK_TIME]: 'Your break time is over',
  [messageTypes.INVALID_STATE_CHANGE]:
    'Unable to process state change event. Invalid transition specified. Manual transition from OFFLINE, ENGAGED, CHAT-ENGAGED or TRANSITION is not currently allowed.',
};
