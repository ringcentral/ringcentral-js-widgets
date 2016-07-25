import Enum from '../../lib/enum';
import loginStatus from './login-status';

const eventDefinitions = {
  ...loginStatus,
};

export const authEvents = new Enum(eventDefinitions);

const eventTypeDefinitions = {
  loginStatusChanged: 'LOGIN_STATUS_CHANGED',
};

export const authEventTypes = new Enum(eventTypeDefinitions);
