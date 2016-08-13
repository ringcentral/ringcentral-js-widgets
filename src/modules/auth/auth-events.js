import KeyValueMap from 'data-types/key-value-map';
import loginStatus from './login-status';

const eventDefinitions = {
  ...loginStatus,
};

export const authEvents = new KeyValueMap(eventDefinitions);

const eventTypeDefinitions = {
  loginStatusChanged: 'LOGIN_STATUS_CHANGED',
};

export const authEventTypes = new KeyValueMap(eventTypeDefinitions);
