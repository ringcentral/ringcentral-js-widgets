import KeyValueMap from 'data-types/key-value-map';

const definition = {
  pending: 'PENDING', // after init, before status from platform is determined
  notLoggedIn: 'NOT_LOGGED_IN',
  loggingIn: 'LOGGING_IN',
  loggedIn: 'LOGGED_IN',
  loggingOut: 'LOGGING_OUT',
};

export default new KeyValueMap(definition);
