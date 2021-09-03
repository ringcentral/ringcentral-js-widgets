import { permissionsMessages } from '@ringcentral-integration/commons/enums/permissionsMessages';
export default {
  [permissionsMessages.invalidTier]: "お使いのエディションでは、{application}の統合がサポートされていません。{brand}のエディションをアップグレードするには、アカウント担当者にお問い合わせください。",
  [permissionsMessages.insufficientPrivilege]: "権限が不足しています。アップグレードについてアカウント担当者にお問い合わせください。"
};

// @key: @#@"[permissionsMessages.invalidTier]"@#@ @source: @#@"Your edition does not support {application} integration. Please contact your account representative to upgrade your {brand} edition."@#@
// @key: @#@"[permissionsMessages.insufficientPrivilege]"@#@ @source: @#@"Insufficient privilege. Please contact your account representative for an upgrade."@#@
