/* eslint-disable */
import { permissionsMessages } from '@ringcentral-integration/commons/enums/permissionsMessages';
export default {
  [permissionsMessages.invalidTier]:
    'Esta edición no admite la integración con{application}. Llame a su representante de cuentas para actualizar su edición de{brand}.',
  [permissionsMessages.insufficientPrivilege]:
    'Privilegios insuficientes. Póngase en contacto con su representante para acceder a la actualización.',
} as const;

// @key: @#@"[permissionsMessages.invalidTier]"@#@ @source: @#@"Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition."@#@
// @key: @#@"[permissionsMessages.insufficientPrivilege]"@#@ @source: @#@"Insufficient privilege. Please contact your account representative for an upgrade."@#@
