import { messageTypes } from '../../../../enums';

export default {
  [messageTypes.AGENT_CONFIG_ERROR]: 'Agent Config Error',
  [messageTypes.EMPTY_PHONE_NUMBER]:
    "Sorry, we've failed to get your phone number.",
  [messageTypes.INVALID_PHONE_NUMBER]: 'Sorry, your phone number is invalid.',
  [messageTypes.NO_AGENT_SELECTED]: 'Sorry, no inbound queues selected.',
};
