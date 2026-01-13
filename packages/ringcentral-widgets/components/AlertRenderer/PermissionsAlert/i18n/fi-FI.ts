/* eslint-disable */
import { permissionsMessages } from '@ringcentral-integration/commons/enums/permissionsMessages';
export default {
  [permissionsMessages.invalidTier]:
    'Versiosi ei tue {application} -integraatiota. Ota yhteyttä tilisi järjestelmänvalvojaan, jos haluat päivittää palvelun {brand} versiosi.',
  [permissionsMessages.insufficientPrivilege]:
    'Käyttölupa ei riitä. Pyydä päivitystä tilin järjestelmänvalvojalta.',
} as const;

// @key: @#@"[permissionsMessages.invalidTier]"@#@ @source: @#@"Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition."@#@
// @key: @#@"[permissionsMessages.insufficientPrivilege]"@#@ @source: @#@"Insufficient privilege. Please contact your account representative for an upgrade."@#@
