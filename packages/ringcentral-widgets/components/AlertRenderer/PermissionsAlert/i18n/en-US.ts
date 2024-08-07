import { permissionsMessages } from '@ringcentral-integration/commons/enums/permissionsMessages';

export default {
  [permissionsMessages.invalidTier]:
    'Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition.',
  [permissionsMessages.insufficientPrivilege]:
    'Insufficient privilege. Please contact your account representative for an upgrade.',
} as const;
