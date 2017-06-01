import authMessages from 'ringcentral-integration/modules/Auth/authMessages';

export default {
  [authMessages.internalError]: 'Accesso non riuscito a causa di errori interni. Riprova più tardi.',
  [authMessages.accessDenied]: 'Accesso negato. Contatta il supporto.',
  [authMessages.sessionExpired]: 'Sessione scaduta. Effettua l\'accesso.',
};
