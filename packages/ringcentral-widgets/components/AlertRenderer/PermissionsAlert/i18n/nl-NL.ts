/* eslint-disable */
import { permissionsMessages } from '@ringcentral-integration/commons/enums/permissionsMessages';
export default {
  [permissionsMessages.invalidTier]:
    'Uw versie ondersteunt geen integratie van {application}. Neem contact op met uw accountvertegenwoordiger om uw {brand}-versie te upgraden.',
  [permissionsMessages.insufficientPrivilege]:
    'Onvoldoende rechten. Neem contact op met uw accountvertegenwoordiger voor een upgrade.',
} as const;

// @key: @#@"[permissionsMessages.invalidTier]"@#@ @source: @#@"Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition."@#@
// @key: @#@"[permissionsMessages.insufficientPrivilege]"@#@ @source: @#@"Insufficient privilege. Please contact your account representative for an upgrade."@#@
