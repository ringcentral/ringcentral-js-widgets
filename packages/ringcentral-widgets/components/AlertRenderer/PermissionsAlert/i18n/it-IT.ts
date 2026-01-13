/* eslint-disable */
import { permissionsMessages } from '@ringcentral-integration/commons/enums/permissionsMessages';
export default {
  [permissionsMessages.invalidTier]:
    "La tua versione non supporta l'integrazione {application}. Contatta il rappresentante dell'account per aggiornare la versione {brand}.",
  [permissionsMessages.insufficientPrivilege]:
    "Privilegi insufficienti. Contatta il rappresentante dell'account per un aggiornamento.",
} as const;

// @key: @#@"[permissionsMessages.invalidTier]"@#@ @source: @#@"Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition."@#@
// @key: @#@"[permissionsMessages.insufficientPrivilege]"@#@ @source: @#@"Insufficient privilege. Please contact your account representative for an upgrade."@#@
