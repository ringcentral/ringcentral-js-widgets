/* eslint-disable */
import { permissionsMessages } from '@ringcentral-integration/commons/enums/permissionsMessages';
export default {
  [permissionsMessages.invalidTier]:
    'Votre édition ne prend pas en charge l’intégration de {application}. Veuillez contacter votre représentant de compte pour mettre votre édition {brand} à niveau.',
  [permissionsMessages.insufficientPrivilege]:
    'Privilèges insuffisants. Veuillez communiquer avec votre représentant de compte pour une mise à niveau.',
} as const;

// @key: @#@"[permissionsMessages.invalidTier]"@#@ @source: @#@"Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition."@#@
// @key: @#@"[permissionsMessages.insufficientPrivilege]"@#@ @source: @#@"Insufficient privilege. Please contact your account representative for an upgrade."@#@
