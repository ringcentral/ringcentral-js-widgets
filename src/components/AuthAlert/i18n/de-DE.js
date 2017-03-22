import authMessages from 'ringcentral-integration/modules/Auth/authMessages';

export default {
  [authMessages.internalError]: 'Fehler bei der Anmeldung aufgrund interner Fehler. Versuchen Sie es später erneut.',
  [authMessages.accessDenied]: 'Der Zugriff wurde verweigert. Wenden Sie sich an den Kundendienst.',
  [authMessages.sessionExpired]: 'Die Sitzung ist abgelaufen. Melden Sie sich an.',
};
