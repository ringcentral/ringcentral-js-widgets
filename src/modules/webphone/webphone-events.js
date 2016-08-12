import Enum from '../../lib/enum';
import webphoneStatus from './webphone-status';
import callStatus from './call-status';

const eventDefinitions = {
  ...webphoneStatus,
  ...callStatus,
};

export const webphoneEvents = new Enum(eventDefinitions);
