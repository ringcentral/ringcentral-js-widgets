/* eslint-disable */
import { authMessages } from '@ringcentral-integration/commons/modules/Auth';
export default {
  [authMessages.internalError]:
    'Accesso non riuscito a causa di errori interni. Riprova più tardi.',
  [authMessages.accessDenied]: "Accesso negato. Contatta l'assistenza.",
  [authMessages.sessionExpired]: "Sessione scaduta. Effettua l'accesso.",
  [authMessages.siteAccessForbidden]:
    "Usa un account diverso per effettuare l'accesso. Chiedi supporto all'amministratore.",
} as const;

// @key: @#@"[authMessages.internalError]"@#@ @source: @#@"Login failed due to internal errors. Please try again later."@#@
// @key: @#@"[authMessages.accessDenied]"@#@ @source: @#@"Access denied. Please contact support."@#@
// @key: @#@"[authMessages.sessionExpired]"@#@ @source: @#@"Session expired. Please sign in."@#@
// @key: @#@"[authMessages.siteAccessForbidden]"@#@ @source: @#@"Sorry, use a different account to sign in. Please ask your IT admin for assistance."@#@
