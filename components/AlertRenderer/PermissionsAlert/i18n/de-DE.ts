/* eslint-disable */
import { permissionsMessages } from '@ringcentral-integration/commons/enums/permissionsMessages';
export default {
  [permissionsMessages.invalidTier]:
    'Ihre Edition unterstützt die Integration von {application} nicht. Wenden Sie sich an Ihren Kontoadministrator, um ein Upgrade Ihrer {brand}-Edition durchzuführen.',
  [permissionsMessages.insufficientPrivilege]:
    'Die Berechtigungen sind unzureichend. Wenden Sie sich an Ihren Kontoadministrator, um ein Upgrade zu erhalten.',
} as const;

// @key: @#@"[permissionsMessages.invalidTier]"@#@ @source: @#@"Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition."@#@
// @key: @#@"[permissionsMessages.insufficientPrivilege]"@#@ @source: @#@"Insufficient privilege. Please contact your account representative for an upgrade."@#@
