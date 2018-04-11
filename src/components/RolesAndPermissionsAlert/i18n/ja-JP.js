import permissionMessages from
  'ringcentral-integration/modules/RolesAndPermissions/permissionsMessages';

export default {
  [permissionMessages.invalidTier]: 'お使いのエディションでは\u3001{application}の統合がサポートされていません\u3002{brand}のエディションをアップグレードするには\u3001アカウント担当者にお問い合わせください\u3002',
  [permissionMessages.insufficientPrivilege]: '権限が不足しています\u3002アップグレードについてアカウント担当者にお問い合わせください\u3002',
};

// @key: @#@"[permissionMessages.invalidTier]"@#@ @source: @#@"Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition."@#@
// @key: @#@"[permissionMessages.insufficientPrivilege]"@#@ @source: @#@"Insufficient privilege. Please contact your account representative for an upgrade."@#@
