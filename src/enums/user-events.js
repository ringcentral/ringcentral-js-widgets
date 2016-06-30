import Enum from '../lib/enum';

const definition = {
  userInfoLoaded: 'USER_INFO_LOADED',
  userInfoCleared: 'USER_INFO_CLEARED',
  dialingPlanUpdated: 'DIALING_PLAN_UPDATED',
};

export default new Enum(definition);
