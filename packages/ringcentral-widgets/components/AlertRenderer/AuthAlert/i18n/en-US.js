import authMessages from 'ringcentral-integration/modules/Auth/authMessages';

export default {
  [authMessages.internalError]: 'Login failed due to internal errors. Please try again later.',
  [authMessages.accessDenied]: 'Access denied. Please contact support.',
  [authMessages.sessionExpired]: 'Session expired. Please sign in.',
};
