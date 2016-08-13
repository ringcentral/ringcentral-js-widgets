import KeyValueMap from 'data-types/key-value-map';
import webphoneStatus from './webphone-status';
import callStatus from './call-status';

const eventDefinitions = {
  ...webphoneStatus,
  ...callStatus,
};

export const webphoneEvents = new KeyValueMap(eventDefinitions);
