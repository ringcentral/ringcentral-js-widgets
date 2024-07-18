import { authMessages } from '@ringcentral-integration/commons/modules/Auth';

export default {
  [authMessages.internalError]:
    'Login failed due to internal errors. Please try again later.',
  [authMessages.accessDenied]: 'Access denied. Please contact support.',
  [authMessages.sessionExpired]: 'Session expired. Please sign in.',
  [authMessages.siteAccessForbidden]:
    'Sorry, use a different account to sign in. Please ask your IT admin for assistance.',
} as const;
